import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';

class SetupLog extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
    }
  }

  render() {
    const { results, activeStep } = this.props
    if (results.length > 0) {
      let test = results.map(r=>(
        r
      ))
      console.log(test)
    }
    let logs = results.map(r=>(
      <ListItem key={r.teamwork_id} className="log-item">
        <ListItemIcon>
          <CheckCircleIcon className="success" />
        </ListItemIcon>
        <ListItemText className="message" primary={`Project: ${r.name} added succesfully`} secondary={`${r.teamwork_id}`} />
      </ListItem>
    ))
    return (
      <div className="setup-log">
        <List dense={true}>
          {logs}
        </List>
      </div>
    )
  }
}

export default SetupLog;
