import * as actionTypes from './actionTypes';
import { IProject } from 'store/types/dashboard';

/* ================================================== */
/* GET PROJECTS */
/* ================================================== */
export const getProjects = () => {
  return {
    type: actionTypes.GET_PROJECTS,
  };
};
export const getProjectsStart = () => {
  return {
    type: actionTypes.GET_PROJECTS_START,
  };
};
export const getProjectsSucceed = (projects: IProject[]) => {
  return {
    type: actionTypes.GET_PROJECTS_SUCCEED,
    projects: projects,
  };
};
export const getProjectsFailed = (errorMessage: string) => {
  return {
    type: actionTypes.GET_PROJECTS_FAILED,
    errorMessage: errorMessage,
  };
};

/* ================================================== */
/* GET SPECIFIC PROJECT */
/* ================================================== */
export const getSpecificProject = (id: number) => {
  return {
    type: actionTypes.GET_SPECIFIC_PROJECT,
    id: id,
  };
};
export const getSpecificProjectStart = () => {
  return {
    type: actionTypes.GET_SPECIFIC_PROJECT_START,
  };
};
export const getSpecificProjectSucceed = (specificProject: IProject) => {
  return {
    type: actionTypes.GET_SPECIFIC_PROJECT_SUCCEED,
    specificProject: specificProject,
  };
};
export const getSpecificProjectFailed = (errorMessage: string) => {
  return {
    type: actionTypes.GET_SPECIFIC_PROJECT_FAILED,
    errorMessage: errorMessage,
  };
};

/* ================================================== */
/* UPDATE PROJECT */
/* ================================================== */
export const updateProject = (project: IProject) => {
  return {
    type: actionTypes.UPDATE_PROJECT,
    project: project,
  };
};
export const updateProjectStart = () => {
  return {
    type: actionTypes.UPDATE_PROJECT_START,
  };
};
export const updateProjectSucceed = (updatedProject: IProject) => {
  return {
    type: actionTypes.UPDATE_PROJECT_SUCCEED,
    updatedProject: updatedProject,
  };
};
export const updateProjectClear = () => {
  return {
    type: actionTypes.UPDATE_PROJECT_CLEAR,
  };
};
export const updateProjectFailed = (errorMessage: string) => {
  return {
    type: actionTypes.UPDATE_PROJECT_FAILED,
    errorMessage: errorMessage,
  };
};
