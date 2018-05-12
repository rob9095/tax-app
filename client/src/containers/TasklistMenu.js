import React from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

class TasklistMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        anchorEl: null,
    }
    this.handleClose = this.handleClose.bind(this);
  }


  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event) => {
    this.props.handleSelect(event.currentTarget.textContent);
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { label, handleSelect }  = this.props;
    return (
      <div>
        <span
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {label}
        </span>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Sort</MenuItem>
          <MenuItem onClick={this.handleClose}>Add Tasks</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default TasklistMenu;
