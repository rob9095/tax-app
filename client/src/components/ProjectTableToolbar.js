import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { lighten } from 'material-ui/styles/colorManipulator';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import SaveViewModal from '../containers/SaveViewModal';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class ProjectTableToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSaveModal: false,
      searchOpen: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.openSaveModal === true && this.props.openSaveModal === false) {
      this.setState({
        showSaveModal: true,
      })
      this.props.toggleSaveModel();
    }
  }

  toggleSearch = () => {
    this.setState({
      searchOpen: !this.state.searchOpen
    })
    this.props.toggleSearchView();
  }

  toggleSaveViewModal = () => {
    this.setState({
      showSaveModal: !this.state.showSaveModal,
    })
  }

  handleSaveView = () => {
    this.props.toggleGetHeadState();
  }

  render() {
    const { numSelected, classes, currentTasks, tableState } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {this.state.showSaveModal && (
          <SaveViewModal tasks={currentTasks} tableData={tableState} toggleModal={this.toggleSaveViewModal} />
        )}
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title">Projects</Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <div className="toolbar-container">
              <Tooltip title="Save View">
                <IconButton
                  aria-label="Save View"
                  onClick={this.handleSaveView}
                  >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Search">
                <IconButton
                  aria-label="Search"
                  onClick={this.toggleSearch}
                  >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      </Toolbar>
    );
  }
}

ProjectTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(ProjectTableToolbar);
