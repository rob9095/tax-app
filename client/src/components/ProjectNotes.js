import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addError, removeError } from '../store/actions/errors';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Badge from 'material-ui/Badge';
import Paper from 'material-ui/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import MessageReplyItem from './MessageReplyItem';

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
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    maxHeight: 800,
    overflowY: 'auto',
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
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  filledIcon: {
    color: theme.palette.primary.main,
  },
  marginIcon: {
    marginLeft: -8,
  }
});

class ProjectNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      errMessage: '',
    };
  }

  componentDidMount() {
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.removeError();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  closeErrors = () => {
    this.setState({
      inputErrors: false,
      errMessage: '',
    });
    this.props.removeError();
  }

  render() {
    const { classes, currentUser, errors, notes} = this.props;
    let displayNotes = notes.map(n => (
      <MessageReplyItem
        key={n._id}
        note={n}
      />
    ))
    .sort((a, b) => (a.postedOn < b.postedOn ? -1 : 1));
    return (
      <div>
        <IconButton
          onClick={this.handleOpen}
          className={classes.marginIcon}
        >
          {notes.length > 0 ?
             <ChatBubbleIcon className={classes.filledIcon} />
             :
             <ChatBubbleIcon />
           }
        </IconButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <CloseIcon onClick={this.handleClose} color="primary" className="modal-close" />
            {this.state.errMessage && (
              <Paper elevation={4} className="alert alert-error">
                {this.state.errMessage}
                <CloseIcon onClick={this.closeErrors} color="primary" className="alert-close" />
              </Paper>
            )}
            {displayNotes.length > 0 ?
              displayNotes
              :
              `No Notes found.`
            }
          </div>
        </Modal>
      </div>
    );
  }
}

ProjectNotes.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    errors: state.errors,
    invitations: state.invitations,
    // add state obj for messageReplies
	};
}

export default withStyles(styles)(connect(mapStateToProps, { addError, removeError })(ProjectNotes));
