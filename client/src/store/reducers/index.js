import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import projects from './projects';
import invitations from './invitations';

const rootReducer = combineReducers({
	currentUser,
	errors,
	projects,
	invitations,
});

export default rootReducer;
