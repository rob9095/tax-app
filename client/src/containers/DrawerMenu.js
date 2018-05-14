import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {logout} from '../store/actions/auth';
import { MenuList, MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';


const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

class DrawerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  logout = e => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { classes, currentUser } = this.props;
    return (
      <div className="menu-container">
        {currentUser.isAuthenticated && (
          <div>
            <div className="menu-header">
              <Typography variant="title" className="title">Tax Samaritan</Typography>
            </div>
            <MenuList>
              <Link className="plain-a" to="/dashboard">
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <ShowChartIcon />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="Project Dashboard" />
                </MenuItem>
              </Link>
              <Link className="plain-a" to="/account">
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <PersonOutlineIcon />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="My Account" />
                </MenuItem>
              </Link>
                <MenuItem onClick={this.logout} className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
                </MenuItem>
            </MenuList>
          </div>
        )}
        {!currentUser.isAuthenticated && (
          <div>
            <div className="menu-header">
              <Typography variant="title" className="title">Tax Samaritan</Typography>
            </div>
            <MenuList>
              <Link className="plain-a" to="/signin">
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="Login" />
                </MenuItem>
              </Link>
              <Link className="plain-a" to="/signup">
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="Create Account" />
                </MenuItem>
              </Link>
            </MenuList>
          </div>
        )}
      </div>
    );
  }
}

DrawerMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    errors: state.errors,
    projects: state.projects,
	};
}

export default compose(withStyles(styles), connect(mapStateToProps, { logout }), )(DrawerMenu);
