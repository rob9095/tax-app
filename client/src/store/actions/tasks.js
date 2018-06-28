import { apiCall, teamworkApiCall } from '../../services/api';
import { LOAD_TEAMWORK_DATA, LOAD_PROJECTS_FROM_DB } from '../actionTypes';
import {addError, removeError} from './errors';

const buildPages = (num) => {
	let pageCount = num
	let pages = [];
	for (let n = 1; n<=pageCount; n++ ) {
		pages.push(n)
	}
	return pages;
}

const handleLocalApiRequest = (data, type) => {
  return new Promise((resolve,reject) => {
    setTimeout(()=> {
			console.log(data)
      return apiCall('post', `/api/${type}`, data)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch(err => {
        reject(err);
      })
    }, 250)
  });
}

const handleApiRequest = (project_id) => {
  const url = `https://taxsamaritan.teamwork.com/projects/${project_id}/tasks.json?includeCompletedTasks=true&pageSize=250`
	return new Promise((resolve,reject) => {
		return teamworkApiCall('get', url)
		.then(async (data) => {
      let result = await handleLocalApiRequest(data, 'tasks');
      resolve(result);
		})
		.catch(err => {
			reject(err);
		})
	});
}

export const requestAndUpdateTasks = (projects) => {
  return dispatch => {
    let results = [];
    let pages = buildPages(32);
    setTimeout(async ()=> {
			let counter = 0;
      for (let p of projects.filter(p=>p.teamwork_id === '246876')) {
        let result = await handleApiRequest(p.teamwork_id);
				console.log(result)
				counter++
			}
			if (counter === projects.length) {
				console.log('all done!')
			}
    }, 1000)
  }
}
