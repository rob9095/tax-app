import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSavedViewDisplay, clearSavedViewDisplay } from '../store/actions/savedTableView';
import { deleteSavedTableView } from '../store/actions/savedTableViews';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from 'material-ui/Tooltip';

class SavedViewListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleShareClick = (e) => {
    console.log('we need to update the view!')
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

  render() {
    const { view, sharedView, isShared } = this.props;
    return(
      <li
        onClick={this.handleClick}
      >
        <span className="title">{view.title}</span>
        {sharedView ?
          <span className="username">{view.username}</span>
          :
          <span className="share">
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
          </span>
        }
        {sharedView ?
          null
          :
          <span className="delete">
          <Tooltip title="Delete">
            <IconButton
              onClick={this.handleDelete}
              aria-label="Delete"
              >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          </span>
        }
      </li>
    )
  }
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    errors: state.errors,
    tableState: state.tableState,
    savedViews: state.savedViews,
    savedView: state.savedView,
	};
}

export default connect(mapStateToProps, { handleSavedViewDisplay, clearSavedViewDisplay, deleteSavedTableView })(SavedViewListItem);
