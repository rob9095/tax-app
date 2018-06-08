import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewInvitation, getInvitations } from '../store/actions/invitations';
import { addError, removeError } from '../store/actions/errors';
import { addSavedTableView, getSavedTableViews } from '../store/actions/savedTableViews';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import SavedViewListItem from '../components/SavedViewListItem';

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
  button: {
    margin: theme.spacing.unit,
    marginTop: 20,
  }
});

class SaveViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      inputErrors: false,
      errMessage: '',
    };
  }

  componentDidMount() {
    this.props.getSavedTableViews(this.props.currentUser.user.id);
    this.setState({ open: true });
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
    if (this.state.title.length <= 0) {
      this.setState({
        inputErrors: true,
        errMessage: 'Please enter a name',
      });
      return
    }
    const tableBodyState = {
      ...this.props.tableData,
    };
    const tableHeadState = {
      ...this.props.tableData.headState,
      tasks: this.props.tasks,
    }
    delete tableHeadState.currentEvent;
    delete tableHeadState.columnData;
    delete tableBodyState.data;
    delete tableBodyState.getHeaderState;
    delete tableBodyState.showSaveModal;
    delete tableBodyState.headState;
    const viewData = {
      table: 'projects',
      title: this.state.title,
      user: this.props.currentUser.user.id,
      username: this.props.currentUser.user.username,
      headerState: tableHeadState,
      bodyState: tableBodyState,
    }
    this.props.addSavedTableView(viewData)
  }

  closeErrors = () => {
    this.setState({
      inputErrors: false,
      errMessage: '',
    });
    this.props.removeError();
  }

  render() {
    const { classes, currentUser, errors, savedViews } = this.props;
    let views = savedViews.map(v => (
      <SavedViewListItem
        key={v._id}
        view={v}
      />
    ))
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
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
                id="title"
                type="text"
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
                className={classes.input}
                placeholder="View Name"
              />
            </FormControl>
            <Button
              onClick={this.handleSubmit}
              className={classes.button}
              variant="raised"
              type="submit"
              color="primary">
              Save View
            </Button>
            <h4>Saved Views</h4>
            <ul className="view-list">
              {views}
            </ul>
          </div>
        </Modal>
      </div>
    );
  }
}

SaveViewModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    errors: state.errors,
    tableState: state.tableState,
    savedViews: state.savedViews,
	};
}

export default withStyles(styles)(connect(mapStateToProps, { addError, removeError, addSavedTableView, getSavedTableViews })(SaveViewModal));
