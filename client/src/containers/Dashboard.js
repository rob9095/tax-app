import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions/auth';
import { fetchDBProjects } from '../store/actions/teamworkApi';
import EnhancedTable from '../components/ProjectTable'
import ProjectChart from '../components/ProjectChart'
import TasklistPopover from '../containers/TasklistPopover'

class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showPopover: false,
        tasks: [],
        currentTaskName: '',
        removeTask: false,
      };
      this.togglePopover = this.togglePopover.bind(this);
      this.toggleColumn = this.toggleColumn.bind(this);
    }

    componentDidMount() {
      if(this.props.currentUser.isAuthenticated) {
        this.props.fetchDBProjects();
      }
    }

    toggleColumn = (task) => {
      if (task === this.state.currentTaskName) {
        this.setState({
          removeTask: true,
        })
      }
      this.setState({
        currentTaskName: task,
      })
    }

    togglePopover = (tasks) => {
      this.setState({
        showPopover: true,
        tasks: tasks
      })
    }

    render() {
      {if (this.props.projects.projectsInDB === undefined) {
        return(
          <div />
        )
      }}
      const { currentUser, projects } = this.props;
      if(!currentUser.isAuthenticated){
    		return (
    			<div className="home-hero">
    				<h1>Tax-App Web Portal</h1>
    				<h4>Singup</h4>
    				<Link to="/signup" className="btn btn-primary">
    					Signup
    				</Link>
            <h4>Login</h4>
    				<Link to="/signin" className="btn btn-primary">
    					Login
    				</Link>
    			</div>
    		);
    	}
    	return (
    		<div>
          <h2>Project Dashboard</h2>
          <div className="chart-container">
            <ProjectChart
              projectData={projects}
             />
          </div>
          {this.state.showPopover && (
            <div className="tasklist-popover">
              <TasklistPopover
                tasks={this.state.tasks}
                handleColumnToggle={this.toggleColumn}
              />
            </div>
          )}
          <EnhancedTable
            projectData={projects}
            onTogglePopover={this.togglePopover}
            lastCheckedTask={this.state.currentTaskName}
            removeTask={this.state.removeTask}
          />
    		</div>
    	);
    }
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    projects: state.projects
	};
}

export default connect(mapStateToProps, { logout, fetchDBProjects })(Dashboard);
