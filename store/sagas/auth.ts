import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import axios, { AxiosResponse } from 'axios';

/* ------------------------------- */
//    Sign In
/* ------------------------------- */
export function* signInSaga(action: AppActions) {
  yield put(actions.signInStart());

  let url = 'https://fmstest.dev2ezasia.com/api/token/';

  let credential = {};

  if ('username' in action && 'password' in action) {
    credential = {
      username: action.username,
      password: action.password,
    };
  }

  try {
    let response: AxiosResponse = yield axios.post(url, credential);
    localStorage.setItem('token', response.data.access); // store in local just incase we need it
    yield put(actions.signInSucceed({ access: response.data.access, refresh: response.data.refresh }));
  } catch (error: any) {
    if (error.response.status === 401) {
      yield put(actions.signInFailed(error.response.data.detail));
    } else {
      yield put(actions.signInFailed(error.response.message));
    }
  }
}
