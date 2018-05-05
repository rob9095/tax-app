import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import projects from './projects';

const rootReducer = combineReducers({
	currentUser,
	errors,
	projects
});

export default rootReducer;
