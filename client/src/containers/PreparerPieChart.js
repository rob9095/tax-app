import React, { Component } from 'react';
// import ReactChartkick, { PieChart } from 'react-chartkick';
// import Chart from 'chart.js';
import {PieChart, Legend} from 'react-easy-chart';
// import 'chartjs-plugin-datalabels';
// ReactChartkick.addAdapter(Chart);

class PreparerPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      showToolTip: false,
      top: null,
      left: null,
      value: null,
      key: null,
      }
  }

  componentDidMount() {
    let preparers = {};
    this.props.projectData.forEach(p => {
      if (preparers[p.preparer]) {
        preparers[p.preparer]++
      } else {
        if (p.preparer !== undefined && p.preparer !== '') {
          preparers[p.preparer] = 1
        }
      }
    })
    const data = Object.entries(preparers).map((p)=>({key: p[0], value: p[1]})).filter(p=>p.value > 2)
    this.setState({
      chartData: data
    })
  }

  //<ColumnChart label="Projects" id="projects-chart" colors={["#c49e9f"]}  options={this.state.options} data={this.state.chartData} />

  render() {
    const { projectData } = this.props
    return(
      <span>
        <PieChart
          labels
          data={this.state.chartData}
          styles={{
            '.chart_text': {
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
            }
          }}
         />
         <Legend data={this.state.chartData} dataId={'key'} horizontal />
      </span>
    )
  }

}

export default PreparerPieChart;
