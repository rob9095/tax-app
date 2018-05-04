import { teamworkApiCall } from '../../services/api';
import { LOAD_TEAMWORK_DATA } from '../actionTypes';
import {addError, removeError} from './errors';

export function loadProjectData(projects) {
  return {
    type: LOAD_TEAMWORK_DATA,
    data: projects
  }
}

export function fetchTeamworkProjectData() {
  const url = 'https://taxsamaritan.teamwork.com/projects.json?status=ALL?createdAfterDate=2017-04-01?includePeople=true'
	return dispatch => {
		return new Promise((resolve,reject) => {
			return teamworkApiCall('get', url)
			.then((data) => {
				console.log(data);
				resolve();
			})
			.catch(err => {
				dispatch(addError(err.message));
				reject();
			})
		});
	}
};

export function addProjectsDB(arr) {
  return dispatch => {
		return new Promise((resolve,reject) => {
			return apiCall('post', '/api/projects', arr)
			.then((res) => {
        console.log(res);
				resolve();
			})
			.catch(err => {
				dispatch(addError(err.message));
				reject();
			})
		});
	}
};

export function updateProjectsDB() {
  const url = 'https://taxsamaritan.teamwork.com/projects.json?status=ALL'
	return dispatch => {
		return new Promise((resolve,reject) => {
			return teamworkApiCall('get', url)
			.then((data) => {
        let project = data.projects;
          // add each project to array, include name, id, created-on, status, category
          let formatedProjects = [];
          projects.forEach(p=> {
            formatedProjects.push({
              name: p.name,
              id: p.id,
              createdOn: p.created-on,
              status: p.status,
              category: p.category
            })
          })
          addProjectsDB(formatedProjects);
				resolve();
			})
			.catch(err => {
				dispatch(addError(err.message));
				reject();
			})
		});
	}
};
