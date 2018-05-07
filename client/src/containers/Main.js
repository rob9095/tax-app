import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard'
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import Grid from 'material-ui/Grid';

const Main = props => {
	const {authUser, errors, removeError, currentUser } = props;
	return(
		<Grid container spacing={24} className="container">
			<Grid item xs={12}>
				<div>
					<Switch>
						<Route exact path="/homepage" render={props => <Homepage currentUser={currentUser} {...props} />} />
					<Route exact path="/" render={props => <Dashboard currentUser={currentUser} {...props} />} />
						<Route
							exact
							path="/signin"
							render={props => {
								return (
									<AuthForm
										removeError={removeError}
										errors={errors}
										onAuth={authUser}
										buttonText="Log In"
										heading="Welcome Back."
										{...props}
									/>
								);
							}}
						/>
						<Route
							exact
							path="/signup"
							render={props => {
								return (
									<AuthForm
										removeError={removeError}
										errors={errors}
										onAuth={authUser}
										signUp
										buttonText="Sign me up!"
										heading="Sign up now."
										{...props}
									/>
								);
							}}
						/>
					</Switch>
				</div>
			</Grid>
		</Grid>
	);
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));
