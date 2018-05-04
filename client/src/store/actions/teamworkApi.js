import { apiCall, teamworkApiCall } from '../../services/api';
import { LOAD_TEAMWORK_DATA } from '../actionTypes';
import {addError, removeError} from './errors';

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
        console.log(err);
				reject();
			})
		});
	}
};

function addProjectsDB(data) {
  console.log(data);
  return dispatch => {
		return new Promise((resolve,reject) => {
			return apiCall('post', '/api/projects', data)
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
  const url = 'https://taxsamaritan.teamwork.com/projects.json?status=ACTIVE'
	return dispatch => {
		return new Promise((resolve,reject) => {
			return teamworkApiCall('get', url)
			.then((data) => {
        console.log(data);
        let projects = data.projects;
          // add each project to array, include name, id, created-on, status, category
          let formatedProjects = [];
          projects.forEach(p=> {
            formatedProjects.push({
              teamwork_id: p.id,
              name: p.name,
              createdOn: p['created-on'],
              status: p.status,
            })
          })
          // send formatted array to backend to add to DB
          const projectData = {
            "projects": formatedProjects
          }
          return new Promise((resolve,reject) => {
      			return apiCall('post', '/api/projects', projectData)
      			.then((res) => {
              console.log(res);
      				resolve();
      			})
      			.catch(err => {
      				dispatch(addError(err.message));
      				reject();
      			})
      		});
				resolve();
			})
			.catch(err => {
				dispatch(addError(err.message));
				reject();
			})
		});
	}
};
