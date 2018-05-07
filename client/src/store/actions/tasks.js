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
      return apiCall('post', `/api/${type}`, data)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch(err => {
        reject(err);
      })
    }, 1000)
  });
}

const handleApiRequest = (pageNumber) => {
  const url = `https://taxsamaritan.teamwork.com/tasks.json?page=${pageNumber}&pageSize=250`
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

export const requestAndUpdateTasks = () => {
  return dispatch => {
    let results = [];
    let pages = buildPages(19);
    setTimeout(async ()=> {
      for (let p of pages) {
        let result = await handleApiRequest(p);
        console.log(result);
      }
    }, 3000)
  }
}
