import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSavedViewDisplay, clearSavedViewDisplay } from '../store/actions/savedTableView';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class SavedViewListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleDelete = () => {
    this.props.deleteSavedTableView(this.props.view);
  }

  handleClick = () => {
    // if (this.props.savedView.length > 0) {
    //   this.props.clearSavedViewDisplay(this.props.view);
    // }
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
            <DeleteIcon
              onClick={this.handleDelete}
            />
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

export default connect(mapStateToProps, { handleSavedViewDisplay, clearSavedViewDisplay })(SavedViewListItem);
