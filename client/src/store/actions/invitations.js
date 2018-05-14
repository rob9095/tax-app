import { apiCall } from '../../services/api';
import {addError, removeError} from './errors';

const addNewInvitation = (data) => {
  return new Promise((resolve,reject) => {
      return apiCall('post', `/api/invitations`, data)
      .then((res) => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
}
