import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions/auth';
import { fetchDBProjects } from '../store/actions/teamworkApi';
import EnhancedTable from '../components/ProjectTable'

class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      if(this.props.currentUser.isAuthenticated) {
        this.props.fetchDBProjects();
      }
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
        <EnhancedTable
          projectData={projects}
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
