import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import NavbarDrawer from '../components/NavbarDrawer';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { classes, errors, currentUser } = this.props;
    return(
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <NavbarDrawer />
            <Typography variant="title" color="inherit" className={classes.flex}>
              Tax Samaritan
            </Typography>
            {currentUser.isAuthenticated ?
              <Button color="inherit">Logout</Button>
            :
              <Button color="inherit">Login</Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    projects: state.projects
	};
}

export default compose(withStyles(styles), connect(mapStateToProps, { }), )(Navbar);
