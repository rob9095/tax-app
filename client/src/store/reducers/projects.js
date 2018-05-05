
import { LOAD_TEAMWORK_DATA, LOAD_PROJECTS_FROM_DB } from '../actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_TEAMWORK_DATA:
      return {
        data: action.projects
      };
    case LOAD_PROJECTS_FROM_DB:
      return {
        projectsInDB: action.projectsInDB
      }
    default:
      return state;
  }
}
