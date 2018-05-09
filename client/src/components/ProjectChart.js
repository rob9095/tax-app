import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactChartkick, { BarChart, ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';
ReactChartkick.addAdapter(Chart)

class ProjectChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: []
    }
  }

  componentDidMount() {
    let projectLastTasks = {};
    this.props.projects.projectsInDB.forEach(p => {
      if (projectLastTasks[p.lastTasklistChanged]) {
        projectLastTasks[p.lastTasklistChanged]++
      } else {
        projectLastTasks[p.lastTasklistChanged] = 1
      }
    })
    this.setState({
      chartData: projectLastTasks
    })
  }

  render() {
    const { projectData } = this.props
    return(
      <ColumnChart label="Projects" id="projects-chart" colors={["#6c0e0f", "#550b0c"]}  data={this.state.chartData} />
    )
  }

}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    projects: state.projects
	};
}

export default connect(mapStateToProps, {})(ProjectChart);
