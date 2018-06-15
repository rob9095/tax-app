import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { addError, removeError } from '../store/actions/errors';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import SavedViewListItem from '../components/SavedViewListItem';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 700,
  },
  container: {
    margin: '0 auto 0 40px',
  },
  noResults: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  },
});

class SavedViewTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.props.removeError();
    this.setState({ value });
  };

  render() {
    const { classes, savedViews, sharedViews, isLoading } = this.props;
    const { value } = this.state;
    {if (isLoading) {
      return (
        <span>loading..</span>
      )
    }}
    let views = value === 0 ?
      savedViews.map(v => (
        <SavedViewListItem
          key={v._id}
          view={v}
          sharedView={false}
          isShared={v.isShared}
        />
      ))
      :
      sharedViews.filter(v => v.username !== this.props.currentUser.user.username)
      .map(v => (
        <SavedViewListItem
          key={v._id}
          view={v}
          sharedView={true}
          isShared={v.isShared}
        />
      ))
    return (
      <div className={classes.container}>
        <div className={classes.root}>
          <Paper className={classes.root} elevation={0}>
            <AppBar color="inherit" position="static" elevation={0}>
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="My Views" />
                <Tab label="Shared Views" />
              </Tabs>
            </AppBar>
            {value === 0 &&
              <TabContainer>
                <ul className="view-list">
                  <div className="shared-view-container">
                    <span className="title name">Title</span>
                    <span className="title share">Share</span>
                    <span className="title trash">Trash</span>
                  </div>
                  {views.length > 0 ? views : <span className={classes.noResults}>No views found</span>}
                </ul>
              </TabContainer>
            }
            {value === 1 &&
              <TabContainer>
                <div className="shared-view-container">
                  <span className="title">Title</span>
                  <span className="title username">Saved By</span>
                </div>
                <ul className="view-list">
                  {views.length > 0 ? views : <span className={classes.noResults}>No views found</span>}
                </ul>
              </TabContainer>
            }
          </Paper>
        </div>
      </div>
    );
  }
}

SavedViewTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
		errors: state.errors,
    savedViews: state.savedViews,
  };
}

export default compose(withStyles(styles), connect(mapStateToProps, {removeError, addError}), )(SavedViewTabs);
