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
    if (this.state.checked === true) {
      console.log('i just got unchecked!')
    }
    this.setState({ [name]: event.target.checked });
    this.props.handleToggle(this.props.label);
  };

  componentDidMount() {
    let isChecked = this.props.activeTasks.filter(t => t.label === this.props.label)
    if (isChecked.length > 0){
      this.setState({
        checked: true,
      })
    }
  }

  render() {
    return (
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checked}
              onChange={this.handleChange('checked')}
              value={this.props.label}
              color="primary"
            />
          }
          label={this.props.label}
        />
      </div>
    );
  }
}

export default PrimaryCheckbox;
