import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions/auth';
import { fetchDBProjects } from '../store/actions/teamworkApi';
import EnhancedTable from '../components/ProjectTable';
import ProjectChart from '../components/ProjectChart';
import TasklistPopover from '../containers/TasklistPopover';
import OnBoardingTabs from '../containers/OnBoardingTabs';
import ProjectTablev2 from '../components/ProjectTablev2'

class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showPopover: false,
        tasks: [],
        currentTaskName: '',
        removeTask: false,
        toggleCount: 0,
        isLoading: true,
      };
    }

    componentDidMount() {
      if(this.props.currentUser.isAuthenticated) {
        this.props.fetchDBProjects()
        .then(()=> {
          this.setState({
            isLoading: false,
          })
        })
      }
    }

    // componentWillReceiveProps(newProps){
    //   if (newProps.currentUser.isAuthenticated) {
    //     this.props.fetchDBProjects()
    //     .then(()=> {
    //       this.setState({
    //         isLoading: false,
    //       })
    //     })
    //   }
    // }

    toggleColumn = (task) => {
      if (this.state.toggleCount === 1) {
        this.setState({
          currentTaskName: task,
          removeTask: false,
          toggleCount: 0,
        })
      } else if (task === this.state.currentTaskName && this.state.toggleCount !== 1) {
        this.setState({
          currentTaskName: task,
          removeTask: true,
          toggleCount: 1,
        })
      } else {
        this.setState({
          currentTaskName: task,
          removeTask: false,
        })
      }
    }

    togglePopover = (tasks,tasklistName, activeTasks) => {
      this.setState({
        showPopover: true,
        tasks: tasks,
        activeTasks: activeTasks,
      })
    }

    hidePopover = () => {
      this.setState({
        showPopover: false,
      })
    }

    render() {
      const { currentUser, projects, errors } = this.props;
      {if (this.state.isLoading && currentUser.isAuthenticated){
        return(
          <div>loading...</div>
        )
      }}
      if(!currentUser.isAuthenticated){
    		return (
    			<OnBoardingTabs errors={errors} />
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
                activeTasks={this.state.activeTasks}
                tasks={this.state.tasks}
                handleToggle={this.toggleColumn}
                onHidePopover={this.hidePopover}
              />
            </div>
          )}
          <EnhancedTable
            projectData={projects}
            onTogglePopover={this.togglePopover}
            lastCheckedTask={this.state.currentTaskName}
            removeTask={this.state.removeTask}
          />
          {/* <ProjectTablev2 projectData={projects} /> */}
    		</div>
    	);
    }
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    errors: state.errors,
    projects: state.projects
	};
}

export default connect(mapStateToProps, { logout, fetchDBProjects })(Dashboard);
