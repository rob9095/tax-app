import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewInvitation, getInvitations } from '../store/actions/invitations';
import { addError, removeError } from '../store/actions/errors';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import InviteListItem from '../components/InviteListItem';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 20,
  }
});

class InviteUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: '',
      inputErrors: false,
      errMessage: '',
    };
  }

  componentDidMount() {
    this.props.getInvitations();
  }

  componentWillReceiveProps(newProps){
    if (newProps.errors.message !== ''){
      this.setState({
        errMessage: newProps.errors.message
      })
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.props.toggleModal();
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.toggleModal();
    this.props.removeError();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    if (this.state.email.length <= 0) {
      this.setState({
        inputErrors: true,
        errMessage: 'Please enter a valid email',
      });
      return
    }
    const inviteData = {
      invitedByEmail: this.props.currentUser.user.email,
      email: this.state.email,
    }
    this.props.addNewInvitation(inviteData)
    .then(()=>{
      this.setState({
        email: '',
        inputErrors: false,
      })
    })
  }

  closeErrors = () => {
    this.setState({
      inputErrors: false,
      errMessage: '',
    });
    this.props.removeError();
  }

  render() {
    const { classes, currentUser, errors, invitations} = this.props;
    let invites = invitations.map(i => (
      <InviteListItem
        key={i._id}
        invite={i}
      />
    ))
    return (
      <div>
        <Button
          onClick={this.handleOpen}
          className={classes.button}
          variant="raised"
          type="submit"
          color="primary">
          Invite New User
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography className={classes.title}>Add an Email to the access list</Typography>
            {this.state.errMessage && (
              <Paper elevation={4} className="alert alert-error">
                {this.state.errMessage}
                <CloseIcon onClick={this.closeErrors} color="primary" className="alert-close" />
              </Paper>
            )}
            <FormControl>
              <Input
                error={this.state.inputErrors}
                autoComplete="off"
                id="email"
                type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                className={classes.input}
                placeholder="Email (same as Teamwork email)"
              />
            </FormControl>
            <Button
              onClick={this.handleSubmit}
              className={classes.button}
              variant="raised"
              type="submit"
              color="primary">
              Send Invite
            </Button>
            <h4 className={classes.title}>Current Invites</h4>
            <div className="invite-title-container">
              <span className="invite-title">Invited</span>
              <span className="invite-title">Invited By</span>
              <span className="invite-title"></span>
            </div>
            <ul className="invite-list">
              {invites}
            </ul>
          </div>
        </Modal>
      </div>
    );
  }
}

InviteUserModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    errors: state.errors,
    invitations: state.invitations,
	};
}

export default withStyles(styles)(connect(mapStateToProps, { addError, removeError, addNewInvitation, getInvitations })(InviteUserModal));
