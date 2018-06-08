import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import projects from './projects';
import invitations from './invitations';
import tableBodyState from './tableBodyState';
import tableHeadState from './tableHeadState';
import savedViews from './savedViews';
import savedView from './savedView';

const rootReducer = combineReducers({
	currentUser,
	errors,
	projects,
	invitations,
	tableHeadState,
	tableBodyState,
	savedViews,
	savedView,
});

export default rootReducer;
