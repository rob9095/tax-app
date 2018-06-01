import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteInvitation } from '../store/actions/invitations';
import { addError, removeError } from '../store/actions/errors';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class InvitationListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = () => {
    this.props.deleteInvitation({...this.props.invite});
  }

  render() {
    const { invite } = this.props;
    return(
      <li>
        <span className="invited">{invite.email}</span>
        <span className="invited-by">{invite.invitedByEmail}</span>
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
    invitations: state.invitations,
	};
}

export default connect(mapStateToProps, { addError, removeError, deleteInvitation })(InvitationListItem);
