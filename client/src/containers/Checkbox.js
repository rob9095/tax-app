import React, { Component } from 'react';
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
  };

  render() {
    console.log(this.props.label)
    return (
      <div>
        <Checkbox
          checked={this.state.checked}
          onChange={this.handleChange('checked')}
          value={this.props.label}
        />
      </div>
    );
  }
}

export default PrimaryCheckbox;
