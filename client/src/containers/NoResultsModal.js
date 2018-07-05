import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';

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
    minWidth: 500,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 4,
    maxHeight: 800,
    overflowY: 'auto',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    textAlign: 'center',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class NoResultsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      inputErrors: false,
      errMessage: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({
      open: true,
    })
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleTableReset = () => {
    this.handleClose();
    this.props.onTableReset();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div className={classes.formContainer}>
              <h2>No Results Found</h2>
              <p>Reset Table Data?</p>
              <div className={classes.buttonGroup}>
                <Button
                  onClick={this.handleTableReset}
                  className={classes.button}
                  variant="raised"
                  type="submit"
                  color="primary">
                  Yes
                </Button>
                <Button
                  onClick={this.handleClose}
                  className={classes.button}
                  variant="raised"
                  type="submit"
                  color="primary">
                  No
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

NoResultsModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    errors: state.errors,
    tableState: state.tableState,
    savedViews: state.savedViews,
    sharedViews: state.sharedViews,
	};
}

export default withStyles(styles)(connect(mapStateToProps, {  })(NoResultsModal));
