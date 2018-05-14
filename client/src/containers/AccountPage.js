import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import OnBoardingTabs from '../containers/OnBoardingTabs';
import InviteUserModal from '../containers/InviteUserModal';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 20,
  }
});

class AccountPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        inputsDisabled: true,
        updatePasswords: false,
        username: '',
        email: '',
        apiKey: '',
        password: '',
        passwordCheck: '',
      };
    }

    handleChange = e => {
  		this.setState({
  			[e.target.name]: e.target.value
  		});
  	};

    handleEditProfile = () => {
      this.setState({
        inputsDisabled: !this.state.inputsDisabled,
        updatePasswords: !this.state.updatePasswords,
        username: '',
        email: '',
        apiKey: '',
        password: '',
        passwordCheck: '',
      })
    }

    render() {
      const { inputsDisabled, updatePasswords, username, email, apiKey, password, passwordCheck } = this.state;
      const { classes, currentUser, projects, errors } = this.props;
      if(!currentUser.isAuthenticated){
    		return (
    			<OnBoardingTabs errors={errors} />
    		);
    	}
    	return (
    		<Paper elevation={4} className="account-container">
          <h1>My Account</h1>
          <div className="details-container">
            <FormControl>
              <FormHelperText id="username-helper">Username</FormHelperText>
              <Input
                disabled={inputsDisabled}
                autoComplete="off"
                id="username"
                type="text"
                name="username"
                onChange={this.handleChange}
                value={username}
                placeholder={currentUser.user.username}
                className={classes.input}
              />
            </FormControl>
            <FormControl>
              <FormHelperText id="email-helper">Email</FormHelperText>
              <Input
                disabled={inputsDisabled}
                autoComplete="off"
                id="email"
                type="text"
                name="email"
                onChange={this.handleChange}
                value={email}
                className={classes.input}
                placeholder="Email"
              />
            </FormControl>
            <FormControl>
              <FormHelperText id="api-helper">API Key</FormHelperText>
              <Input
                disabled={inputsDisabled}
                autoComplete="off"
                id="apiKey"
                type="text"
                name="apiKey"
                onChange={this.handleChange}
                value={apiKey}
                className={classes.input}
                placeholder="API Key"
              />
            </FormControl>
              {!updatePasswords && (
                <div className="button-group">
                  <InviteUserModal currentUser={currentUser} />
                  <Button
                    onClick={this.handleEditProfile}
                    className={classes.button}
                    variant="raised"
                    type="submit"
                    color="primary">
                    Edit Profile
                  </Button>
                </div>
              )}
              {updatePasswords && (
                <div className="password-group">
                  <FormControl>
                    <FormHelperText id="password-helper">Password</FormHelperText>
                    <Input
                      autoComplete="off"
                      id="password"
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                      value={password}
                      className={classes.input}
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormControl>
                    <FormHelperText id="passwordCheck-helper">Password Confirmation</FormHelperText>
                    <Input
                      autoComplete="off"
                      id="passwordCheck"
                      type="password"
                      name="passwordCheck"
                      onChange={this.handleChange}
                      value={passwordCheck}
                      className={classes.input}
                      placeholder="Password Confirmation"
                    />
                  </FormControl>
                  <div className="button-group">
                    <Button
                      onClick={this.handleEditProfile}
                      className={classes.button}
                      variant="raised"
                      type="submit"
                      color="primary">
                      Cancel Changes
                    </Button>
                    <Button
                      className={classes.button}
                      variant="raised"
                      type="submit"
                      color="primary">
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
          </div>
    		</Paper>
    	);
    }
}

AccountPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    errors: state.errors,
    projects: state.projects
	};
}

export default withStyles(styles)(connect(mapStateToProps, { })(AccountPage));
