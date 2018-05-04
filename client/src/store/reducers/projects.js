
import { LOAD_TEAMWORK_DATA } from '../actionTypes';

export default (state = {}, action) {
  switch (action.type) {
    case LOAD_TEAMWORK_DATA:
      return {
        data: action.projects
      };
    default:
      return state;
  }
}
