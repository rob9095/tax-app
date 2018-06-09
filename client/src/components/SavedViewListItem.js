import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSavedViewDisplay, clearSavedViewDisplay } from '../store/actions/savedTableView';
import { deleteSavedTableView } from '../store/actions/savedTableViews';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class SavedViewListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
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
    const { view } = this.props;
    return(
      <li
        onClick={this.handleClick}
      >
        <span className="title">{view.title}</span>
        <span className="delete">
          <IconButton
            onClick={this.handleDelete}
            aria-label="Delete"
            >
            <DeleteIcon />
          </IconButton>
        </span>
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
