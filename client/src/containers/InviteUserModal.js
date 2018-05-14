import React from 'react';
import PropTypes from 'prop-types';
import { addInvitation } from '../store/actions/invitations';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';

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

class InviteUserModal extends React.Component {
  state = {
    open: false,
    email: '',
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes, currentUser } = this.props;

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
            <FormControl>
              <Input
                autoComplete="off"
                id="email"
                type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                className={classes.input}
                placeholder="Email"
              />
            </FormControl>
            <Button
              className={classes.button}
              variant="raised"
              type="submit"
              color="primary">
              Save Invite
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

InviteUserModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InviteUserModal);
