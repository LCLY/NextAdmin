import { AxiosError } from 'axios';
import { AppActions } from 'store/types';
import { put } from 'redux-saga/effects';

// for reducers
/**
 * This utility function updates the old state with the latest state in reducers
 * @param {object} oldObject initialState/previous state in reducer
 * @param {object} updatedProperties latest state either from sagas or actions
 * @return Latest state to frontend via mapStateToProps
 * @category Utilities
 */

export const updateObject = (oldObject: object, updatedProperties: object) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

/* ========================================== */
/**
 * Setting token into the header config for axios
 * @return {*}
 */
/* ========================================== */
export const getAxiosHeaderToken = () => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  return config;
};

/* ========================================== */
/**
 * Pass error messages to reducer
 * @export
 * @param {AxiosError} error
 * @param {(errorMessage: string) => AppActions} failedAction
 * @param {string} errorMessage
 */
/* ========================================== */
export function* setPromiseError(error: AxiosError, failedAction: (errorMessage: string) => any, errorMessage: string) {
  if (error.response) {
    if (error.response.status === 401) {
      window.location.href = '/logout';
    }
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    console.log('error response data:', error.response.data);
    console.log('error response status:', error.response.status);
    // console.log('error response error:', error.response.errors);

    yield put(failedAction(errorMessage));
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    console.log('error response request:', error.request);
  } else {
    // Something happened in setting up the request and triggered an Error
    alert('Error:' + error.message);
  }
}
