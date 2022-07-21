import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import axios, { AxiosResponse } from 'axios';

import { getAxiosHeaderToken, setPromiseError } from '../../utils/utils';

/* ------------------------------- */
//    Get Projects
/* ------------------------------- */
export function* getProjectsSaga(_action: AppActions) {
  yield put(actions.getProjectsStart());

  let url = 'https://fmstest.dev2ezasia.com/api/v1/projects/';

  try {
    let response: AxiosResponse = yield axios.get(url, getAxiosHeaderToken());
    yield put(actions.getProjectsSucceed(response.data.results));
  } catch (error: any) {
    yield setPromiseError(error, actions.getProjectsFailed, 'Get Projects Project Failed');
  }
}

/* ------------------------------- */
//    Get Specific Project
/* ------------------------------- */
export function* getSpecificProjectSaga(action: AppActions) {
  yield put(actions.getSpecificProjectStart());

  if (!('id' in action)) return;

  let url = `https://fmstest.dev2ezasia.com/api/v1/projects/${action.id}`;

  try {
    let response: AxiosResponse = yield axios.get(url, getAxiosHeaderToken());
    yield put(actions.getSpecificProjectSucceed(response.data));
  } catch (error: any) {
    yield setPromiseError(error, actions.getSpecificProjectFailed, 'Get Specific Project Failed');
  }
}
export function* updateProjectSaga(action: AppActions) {
  yield put(actions.updateProjectStart());

  if (!('project' in action)) return;

  let url = `https://fmstest.dev2ezasia.com/api/v1/projects/${action.project.id}/`;

  let payload = { title: action.project.title, description: action.project.description };

  try {
    let response: AxiosResponse = yield axios.patch(url, payload, getAxiosHeaderToken());
    yield put(actions.updateProjectSucceed(response.data));
  } catch (error: any) {
    yield setPromiseError(error, actions.updateProjectFailed, 'Update Project Failed');
  }
}
