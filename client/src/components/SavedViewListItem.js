import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { handleSavedViewDisplay, clearSavedViewDisplay, setDefaultView } from '../store/actions/savedTableView';
import { deleteSavedTableView, toggleSharedView } from '../store/actions/savedTableViews';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class SavedViewListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleShareClick = (e) => {
    const viewData = {
      viewId: this.props.view._id,
      username: this.props.currentUser.user.username,
    }
    this.props.toggleSharedView(viewData)
    e.stopPropagation();
  }

  handleDelete = (e) => {
    this.props.deleteSavedTableView(this.props.view);
    this.props.clearSavedViewDisplay(this.props.view);
    e.stopPropagation();
  }

  handleClick = () => {
    this.props.handleSavedViewDisplay(this.props.view);
  }

  handleSetDefaultView = (e) => {
    const userId = this.props.currentUser.user.id
    const viewId = this.props.view._id
    this.props.setDefaultView({
      userId,
      viewId,
    })
    e.stopPropagation();
  }

  render() {
    const { view, sharedView, isShared } = this.props;
    const isDefault = this.props.defaultView ? this.props.defaultView[0].title === view.title : false
    return (
      <ListItem
        className="view-item"
        onClick={this.handleClick}
        key={view._id}
        disableGutters={true}
        dense
        button
        >
          {sharedView && (<Avatar alt={view.username} src={view.profileImageUrl} />)}
          <ListItemText
            primary={view.title}
            secondary={sharedView && (view.username)}
          />
          <Tooltip title={isDefault ? 'Remove Default View' : 'Set Default View'}>
            <IconButton
              onClick={this.handleSetDefaultView}
              aria-label={isDefault ? 'Remove Default View' : 'Set Default View'}
              >
              {isDefault ? <StarIcon className="star filled" /> : <StarIcon /> }
            </IconButton>
          </Tooltip>
          {!sharedView && (
              <Tooltip title={isShared ? 'Un Share' : 'Share'}>
                <IconButton
                  onClick={this.handleShareClick}
                  aria-label={isShared ? 'Un Share' : 'Share'}
                  >
                  <FavoriteIcon
                    className={isShared ? 'share filled' : null}
                  />
                </IconButton>
              </Tooltip>
            )}
            {!sharedView && (
              <Tooltip title="Delete">
                <IconButton
                  onClick={this.handleDelete}
                  aria-label="Delete"
                  >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
      </ListItem>
    );
  }
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    errors: state.errors,
    tableState: state.tableState,
    savedViews: state.savedViews,
    savedView: state.savedView,
    defaultView: state.defaultView,
	};
}

export default connect(mapStateToProps, { handleSavedViewDisplay, clearSavedViewDisplay, deleteSavedTableView, toggleSharedView, setDefaultView })(SavedViewListItem);
