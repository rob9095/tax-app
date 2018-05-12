import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import PrimaryCheckbox from './Checkbox';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class TasklistPopover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
    }
    this.handleCheckmarkToggle = this.handleCheckmarkToggle.bind(this)
  }

  handleCheckmarkToggle = (task) => {
    this.props.handleColumnToggle(task)
  }

  componentDidMount() {
    this.setState({
      tasks: this.props.tasks,
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      tasks: newProps.tasks,
    })
  }

  render() {
    if (this.state.tasks === undefined) {
        return(
          <div />
        )
    }
    let checkboxes = this.state.tasks.map(t=>(
      <PrimaryCheckbox
        key={t}
        label={t}
        handleToggle={this.handleCheckmarkToggle}
      />
    ))
    const { classes } = this.props;
    return(
      <div className="checkbox-container">
        <Paper className={classes.root} elevation={4}>
          <div className="task-checkboxes">
            {checkboxes}
          </div>
        </Paper>
      </div>
    )
  }
}

TasklistPopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TasklistPopover);
