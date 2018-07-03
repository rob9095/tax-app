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
    this.state = {}
  }

  render() {
    const { results, activeStep } = this.props
    let logs = results.map(r=>
      <ListItem key={r.id} className="log-item">
        <ListItemIcon>
          {r.status === 'warning' ? <WarningIcon className="warning" /> : <CheckCircleIcon className="success" /> }
        </ListItemIcon>
        <ListItemText
          className="message"
          primary={r.status === 'warning' ?
          `${r.resultType}: ${r.name}`
           :
           `${r.resultType}: ${r.name} added succesfully ${activeStep >= 4 ? `to ${r.projectName}` : '' }`
          }
          secondary={`Teamwork Project ID: ${r.project_id}`} />
      </ListItem>
    )
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
