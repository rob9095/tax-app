import { addError, removeError } from './errors';
import { LOAD_SAVED_VIEW, CLEAR_SAVED_VIEW } from '../actionTypes';

export const clearDisplayView = (id) => ({
  type: CLEAR_SAVED_VIEW,
  id
})

export const displayView = (view) => ({
  type: LOAD_SAVED_VIEW,
  view
})

export function clearSavedViewDisplay(view) {
  return dispatch => {
    return new Promise((resolve,reject) => {
      if (view) {
        dispatch(clearDisplayView(view._id));
        resolve(view)
      } else {
        dispatch(addError('Please try again'))
        reject();
      }
    })
  }
}

export function handleSavedViewDisplay(view) {
  return dispatch => {
    return new Promise((resolve,reject) => {
      if (view) {
        console.log(view)
        dispatch(displayView(view));
        resolve(view)
      } else {
        dispatch(addError('Please try again'))
        reject();
      }
    })
  }
}
