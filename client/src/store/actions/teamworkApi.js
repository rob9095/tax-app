import { apiCall, teamworkApiCall } from '../../services/api';
import { LOAD_TEAMWORK_DATA, LOAD_PROJECTS_FROM_DB } from '../actionTypes';
import {addError, removeError} from './errors';

export function loadDBProjects(projectsInDB) {
	return{
		type: LOAD_PROJECTS_FROM_DB,
		projectsInDB
	};
};

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

export function fetchDBProjects() {
  return dispatch => {
		return new Promise((resolve,reject) => {
			return apiCall('get', '/api/projects')
			.then((projects) => {
        dispatch(loadDBProjects(projects));
				resolve();
			})
			.catch(err => {
				dispatch(addError(err.message));
				reject();
			})
		});
	}
}

export function updateProjectsDB(key) {
  const url = 'https://taxsamaritan.teamwork.com/projects.json?status=ACTIVE'
	return dispatch => {
		return new Promise((resolve,reject) => {
			return teamworkApiCall('get', url, key)
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
							preparer: p.category.name,
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

export const fetchAndUpdateTasklists = (id) => {
    const url = `https://taxsamaritan.teamwork.com/projects/${id}/tasklists.json?status=all`
  	return dispatch => {
  		return new Promise((resolve,reject) => {
  			return teamworkApiCall('get', url)
  			.then((data) => {
          let tasklists = data.tasklists;
            let formattedTaskLists = [];
            tasklists.forEach(t => {
              formattedTaskLists.push({
                teamwork_id: t.id,
                teamworkProject_id: t.projectId,
                projectName: t.projectName,
                taskName: t.name,
                complete: t.complete,
                status: t.status,
                uncompleteCount: t['uncomplete-count']
              })
            })
            // send formatted array to backend to add to DB
            const taskListData = {
              "tasklists": formattedTaskLists
            }
            return new Promise((resolve,reject) => {
        			return apiCall('post', '/api/tasklists', taskListData)
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


const handleLocalApiRequest = (data, type) => {
  return new Promise((resolve,reject) => {
    setTimeout(()=> {
      return apiCall('post', `/api/${type}`, data)
      .then((res) => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    }, 1000)
  });
}

const processChunk = (arr) => {
  return new Promise(async (resolve,reject) => {
    try {
      let formatedRequest = {
        milestones: arr
      }
      let result = await handleLocalApiRequest(formatedRequest, 'milestones');
      console.log(result);
      resolve();
    } catch(err) {
      reject(err);
    }
  })
}

const chunkifyArray = (arr) => {
  return new Promise(async (resolve,reject) => {
    try {
      let results = [];
      let chunkIndex = 0;
      const l = parseInt(arr.length);
      const totalChunks = parseInt(arr.length/50)
      const chunkLength = parseInt(l / totalChunks);
      for (let n = 1; n <= totalChunks; n++) {
        let chunk = [];
        if (n === totalChunks) {
          chunk = arr.slice(chunkIndex)
        } else {
          chunk = arr.slice(chunkIndex, chunkIndex + chunkLength)
        }
        chunkIndex = chunkIndex + chunkLength;
        results.push(chunk);
      }
      console.log(results);
      for (let chunk of results) {
        let result = await processChunk(chunk);
        resolve(result);
      }
    } catch(err) {
      reject(err);
    }
  })
}

export const fetchAndUpdateCompletedMilestones = (arr) => {
  const url = 'https://taxsamaritan.teamwork.com/milestones.json?find=completed&pageSize=1000';
  return dispatch => {
    return new Promise((resolve,reject) => {
      return teamworkApiCall('get', url)
      .then(async (data) => {
        let result = await chunkifyArray(data.milestones)
        resolve(result);
      })
      .catch(err => {
        console.log(err);
        reject();
      })
    });
  }
}
