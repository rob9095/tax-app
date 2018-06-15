import React, { Component } from 'react';
import { updateUser } from '../store/actions/account';
import { addError, removeError } from '../store/actions/errors';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import CloseIcon from '@material-ui/icons/Close';
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
        editProfile: false,
        username: '',
        email: '',
        apiKey: '',
        password: '',
        passwordCheck: '',
        modalOpen: false,
      };
    }

    handleChange = e => {
  		this.setState({
  			[e.target.name]: e.target.value
  		});
  	};

    handleEditProfile = () => {
      this.setState({
        editProfile: !this.state.editProfile,
        username: '',
        email: '',
        apiKey: '',
        password: '',
        passwordCheck: '',
        profileImageUrl: '',
      })
    }

    handleEditProfileSave = () => {
      this.closeErrors();
      if (this.state.password !== this.state.passwordCheck && this.state.password.length > 0) {
        this.props.addError('Passwords must match');
        return
      }
      if (this.state.password.length > 0 && this.state.password.length < 6) {
        this.props.addError('Choose a password longer than 6 characters');
        return
      }
      if (this.state.password.length > 0 && this.state.password.length < 6) {
        this.props.addError('Choose a password longer than 6 characters');
        return
      }
      const allowedUpdates = ['username', 'apiKey', 'password', 'profileImageUrl'];
      let userUpdates = {
        email: this.props.currentUser.user.email
      };
      allowedUpdates.forEach(val => {
        this.state[val].length > 0 && this.state[val] != this.props.currentUser.user[val] ? userUpdates[val] = this.state[val] : null
      })
      if (Object.keys(userUpdates).length <= 1) {
        this.props.addError('No changes made');
      } else {
        this.props.updateUser(userUpdates);
      }
      console.log(userUpdates)
    }

    toggleModal = () => {
      this.setState({
        modalOpen: !this.state.modalOpen
      })
    }

    closeErrors = () => {
      this.props.removeError();
    }

    render() {
      const { editProfile, updatePasswords, username, email, apiKey, password, passwordCheck } = this.state;
      const { classes, currentUser, projects, errors } = this.props;
      if(!currentUser.isAuthenticated){
    		return (
    			<OnBoardingTabs errors={errors} />
    		);
    	}
    	return (
        <div>
          <h1>My Account</h1>
      		<Paper elevation={4} className="account-container">
            <h3>Profile</h3>
            <div className="details-container">
              {errors.message && !this.state.modalOpen && (
                <Paper elevation={4} className="alert alert-error">
                  {errors.message}
                  <CloseIcon onClick={this.closeErrors} color="primary" className="alert-close" />
                </Paper>
              )}
              <FormControl>
                <FormHelperText id="email-helper">Email</FormHelperText>
                <Input
                  disabled={true}
                  autoComplete="off"
                  id="email"
                  type="text"
                  name="email"
                  onChange={this.handleChange}
                  value={email}
                  className={classes.input}
                  placeholder={currentUser.user.email}
                />
              </FormControl>
              <FormControl>
                <FormHelperText id="username-helper">Username</FormHelperText>
                <Input
                  disabled={!editProfile}
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
                <FormHelperText id="api-helper">API Key</FormHelperText>
                <Input
                  disabled={!editProfile}
                  autoComplete="off"
                  id="apiKey"
                  type="text"
                  name="apiKey"
                  onChange={this.handleChange}
                  value={apiKey}
                  className={classes.input}
                  placeholder={currentUser.user.apiKey ? currentUser.user.apiKey : 'Edit Profile to Add API Key' }
                />
              </FormControl>
                {!editProfile && (
                  <div className="button-group">
                    <InviteUserModal
                      currentUser={currentUser}
                      errors={errors}
                      toggleModal={this.toggleModal}
                    />
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
                {editProfile && (
                  <div className="password-group">
                    <FormControl>
                      <FormHelperText id="password-helper">Password</FormHelperText>
                      <Input
                        autoComplete="off"
                        id="password"
                        type="password"
                        name="password"
                        error={this.state.password !== this.state.passwordCheck ? true : false}
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
                        error={this.state.password !== this.state.passwordCheck ? true : false}
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
                        onClick={this.handleEditProfileSave}
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
        </div>
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
	};
}

export default withStyles(styles)(connect(mapStateToProps, { updateUser, removeError, addError })(AccountPage));