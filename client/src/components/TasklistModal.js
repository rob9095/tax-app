import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import AddIcon from '@material-ui/icons/Add';
import TasklistMenu from '../containers/TasklistMenu';
import PrimaryCheckbox from '../containers/Checkbox';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class TasklistModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      age: '',
    };
    this.handleCheckmarkToggle = this.handleCheckmarkToggle.bind(this)
  }

  handleCheckmarkToggle = (task) => {
    this.props.handleColumnToggle(task)
  }

  handleChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, label, tasks } = this.props;
    if (this.props.tasks === undefined) {
        return(
          <div />
        )
    }
    let checkboxes = this.props.tasks.map(t=>(
      <PrimaryCheckbox
        key={t}
        label={t}
        handleToggle={this.handleCheckmarkToggle}
      />
    ))
    return (
      <div className="tasklist-modal btn">
        <TasklistMenu
          handleModalOpen={this.handleClickOpen}
          label={label}
        />
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Fill the form</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
                {checkboxes}
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

TasklistModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TasklistModal);
