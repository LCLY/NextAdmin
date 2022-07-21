import { takeEvery, all } from 'redux-saga/effects';
//allow us to listen to certain actions and do something when they occur
import * as actionTypes from '../actions/actionTypes';
import { AuthActionTypes } from '../types/auth';
import { DashboardActionTypes } from '../types/dashboard';
import { signInSaga } from './auth';
import { getProjectsSaga, getSpecificProjectSaga, updateProjectSaga } from './dashboard';

export function* watchAuth() {
  yield all([takeEvery<AuthActionTypes>(actionTypes.SIGN_IN, signInSaga)]);
}
export function* watchDashboard() {
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_PROJECTS, getProjectsSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_SPECIFIC_PROJECT, getSpecificProjectSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_PROJECT, updateProjectSaga)]);
}
