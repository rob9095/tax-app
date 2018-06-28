import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions/auth';
import { fetchDBProjects } from '../store/actions/teamworkApi';
import { fetchDefaultView } from '../store/actions/savedTableView';
import EnhancedTable from '../components/ProjectTable';
import ProjectChart from '../components/ProjectChart';
import PreparerPieChart from '../containers/PreparerPieChart';
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
        loadDefaultView: false,
      };
    }

    componentDidMount() {
      // un-authed user send to root
      if (!this.props.currentUser.isAuthenticated) {
        this.props.history.push('/');
      }
      // user is authed and setup is complete
      if(this.props.currentUser.isAuthenticated && this.props.currentUser.user.setupComplete) {
        this.props.fetchDBProjects()
        .then(()=> {
          this.setState({
            isLoading: false,
          })
        })
        this.props.fetchDefaultView(this.props.currentUser.user.id)
        .then((view)=>{
          if (view !== null && view !== undefined) {
            this.setState({
              loadDefaultView: true,
            })
          }
          console.log(view)
        })
      }
      // user is authed, and super admin and setup is incomplete
      if (this.props.currentUser.isAuthenticated && !this.props.currentUser.user.setupComplete && this.props.currentUser.user.isSuperAdmin) {
        this.props.history.push('/setup');
      }
      // user is authed, setup is incomplete, they are not super admin
      if (this.props.currentUser.isAuthenticated && !this.props.currentUser.user.setupComplete && !this.props.currentUser.user.isSuperAdmin) {
        // send home for now, possibly send to custom page
        this.props.history.push('/');
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
    	return (
    		<div>
          <h2>Project Dashboard</h2>
          <div className="chart-container">
            <ProjectChart
              projectData={projects}
             />
             {/* <PreparerPieChart
               projectData={projects.projectsInDB}
             /> */}
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
            loadDefaultView={this.state.loadDefaultView}
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

export default connect(mapStateToProps, { logout, fetchDBProjects, fetchDefaultView })(Dashboard);
