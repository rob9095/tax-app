import { apiCall, teamworkApiCall } from '../../services/api';
import { addError } from './errors';

export function getDetailedProjects() {
  return dispatch => {
		return new Promise((resolve,reject) => {
			return apiCall('get', '/api/projects/detailed')
			.then((projects) => {
				resolve(projects);
			})
			.catch(err => {
				dispatch(addError(err.message));
				reject(err);
			})
		});
	}
}

export function mapTasksToProjects(data) {
  return dispatch => {
		return new Promise((resolve,reject) => {
			return apiCall('post', '/api/projects/map-projects', data)
			.then((data) => {
				resolve(data);
			})
			.catch(err => {
				dispatch(addError(err.message));
				reject(err);
			})
		});
	}
}
