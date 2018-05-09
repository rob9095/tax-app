import React, { Component } from 'react';
import {  FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

class PrimaryCheckbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    this.props.handleToggle(this.props.label);
  };

  render() {
    return (
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checked}
              onChange={this.handleChange('checked')}
              value={this.props.label}
            />
          }
          label={this.props.label}
        />
      </div>
    );
  }
}

export default PrimaryCheckbox;
