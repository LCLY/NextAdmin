import { updateObject } from '../../utils/utils';
import { AppActions } from '../types';
import { DashboardInitialState } from '../types/dashboard';
import { Reducer } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import { toast } from 'react-toastify';
import { HYDRATE } from 'next-redux-wrapper';
// import { HYDRATE } from 'next-redux-wrapper';

const initialState: DashboardInitialState = {
  projects: null,
  loading: false,
  specificProject: null,
  updatedProject: null,
};

/*===================================== */
/* Get Projects */
/*===================================== */
const getProjectsStart = (state: DashboardInitialState, _action: AppActions) => {
  // clear specific project when getting projects so the not found can be cleared
  return updateObject(state, {
    loading: true,
    specificProject: null,
  });
};
const getProjectsSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('projects' in action) {
    return updateObject(state, {
      projects: action.projects,
      loading: false,
    });
  }
  return state;
};
const getProjectsFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
    });
  }
  return state;
};
/*===================================== */
/* Get Projects */
/*===================================== */
const getSpecificProjectStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
  });
};
const getSpecificProjectSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('specificProject' in action) {
    return updateObject(state, {
      specificProject: action.specificProject,
      loading: false,
    });
  }
  return state;
};
const getSpecificProjectFailed = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: false,
    specificProject: 'Not Found',
  });
};

/*===================================== */
/* Update Project */
/*===================================== */
const updateProjectStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
  });
};
const updateProjectSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('updatedProject' in action) {
    return updateObject(state, {
      updatedProject: action.updatedProject,
      loading: false,
    });
  }
  return state;
};
const updateProjectClear = (state: DashboardInitialState, _action: AppActions) => {
  // a reset to indicate that the update is done
  return updateObject(state, {
    updatedProject: null,
  });
};
const updateProjectFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    toast.error(action.errorMessage);
    return updateObject(state, {
      loading: false,
    });
  }
  return state;
};

const reducer: Reducer<DashboardInitialState, AppActions> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case actionTypes.GET_PROJECTS_START:
      return getProjectsStart(state, action);
    case actionTypes.GET_PROJECTS_SUCCEED:
      return getProjectsSucceed(state, action);
    case actionTypes.GET_PROJECTS_FAILED:
      return getProjectsFailed(state, action);
    case actionTypes.GET_SPECIFIC_PROJECT_START:
      return getSpecificProjectStart(state, action);
    case actionTypes.GET_SPECIFIC_PROJECT_SUCCEED:
      return getSpecificProjectSucceed(state, action);
    case actionTypes.GET_SPECIFIC_PROJECT_FAILED:
      return getSpecificProjectFailed(state, action);
    case actionTypes.UPDATE_PROJECT_START:
      return updateProjectStart(state, action);
    case actionTypes.UPDATE_PROJECT_SUCCEED:
      return updateProjectSucceed(state, action);
    case actionTypes.UPDATE_PROJECT_CLEAR:
      return updateProjectClear(state, action);
    case actionTypes.UPDATE_PROJECT_FAILED:
      return updateProjectFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
