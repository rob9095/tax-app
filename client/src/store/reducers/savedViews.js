import { LOAD_VIEWS, ADD_VIEW, REMOVE_VIEW } from '../actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_VIEWS:
      return [...action.views];
    case ADD_VIEW:
      return [...state, action.view];
    case REMOVE_VIEW:
      return state.filter(view => view._id !== action.id);
    default:
      return state;
  }
}
