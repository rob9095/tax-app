import { apiCall, teamworkApiCall } from '../../services/api';

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

export function mapTasksToProjects() {
  return dispatch => {
		return new Promise((resolve,reject) => {
			return apiCall('post', '/api/projects/map-projects')
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
