import { LOAD_SAVED_VIEW, CLEAR_SAVED_VIEW } from '../actionTypes';


const savedView = (state = [], action) => {
  switch (action.type) {
    case LOAD_SAVED_VIEW:
      let check = state.filter(v => action.view.title === v.title)
      if (check.length > 0) {
        return state;
      } else {
        return [...state, action.view];
      }
    case CLEAR_SAVED_VIEW:
      return state.filter(view => view._id !== action.id);
    default:
      return state;
  }
}

export default savedView;
