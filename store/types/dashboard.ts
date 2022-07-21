import * as actionTypes from '../actions/actionTypes';
// defining types for actions
// initialState for reducers
export interface DashboardInitialState {
  readonly loading?: boolean;
  readonly projects?: IProject[] | null;
  readonly specificProject?: IProject | null;
  readonly updatedProject?: IProject | null;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
}

/* ============================================================== */
// Get Project
/* ============================================================== */
export interface GetProjectsAction {
  type: typeof actionTypes.GET_PROJECTS;
}
export interface GetProjectsStartAction {
  type: typeof actionTypes.GET_PROJECTS_START;
}
export interface GetProjectsSucceedAction {
  type: typeof actionTypes.GET_PROJECTS_SUCCEED;
  projects: IProject[];
}
export interface GetProjectsFailedAction {
  type: typeof actionTypes.GET_PROJECTS_FAILED;
}
/* ============================================================== */
// Get Specific Project
/* ============================================================== */
export interface GetSpecificProjectAction {
  type: typeof actionTypes.GET_SPECIFIC_PROJECT;
  id: number;
}
export interface GetSpecificProjectStartAction {
  type: typeof actionTypes.GET_SPECIFIC_PROJECT_START;
}
export interface GetSpecificProjectSucceedAction {
  type: typeof actionTypes.GET_SPECIFIC_PROJECT_SUCCEED;
  specificProject: IProject;
}
export interface GetSpecificProjectFailedAction {
  type: typeof actionTypes.GET_SPECIFIC_PROJECT_FAILED;
}

/* ============================================================== */
// Update Project
/* ============================================================== */

export interface UpdateProjectAction {
  type: typeof actionTypes.UPDATE_PROJECT;
  project: IProject;
}
export interface UpdateProjectStartAction {
  type: typeof actionTypes.UPDATE_PROJECT_START;
}
export interface UpdateProjectSucceedAction {
  type: typeof actionTypes.UPDATE_PROJECT_SUCCEED;
  updatedProject: IProject;
}
export interface UpdateProjectClearAction {
  type: typeof actionTypes.UPDATE_PROJECT_CLEAR;
}
export interface UpdateProjectFailedAction {
  type: typeof actionTypes.UPDATE_PROJECT_FAILED;
}

export type DashboardActionTypes =
  | GetProjectsAction
  | GetProjectsStartAction
  | GetProjectsSucceedAction
  | GetProjectsFailedAction
  | GetSpecificProjectAction
  | GetSpecificProjectStartAction
  | GetSpecificProjectSucceedAction
  | GetSpecificProjectFailedAction
  | UpdateProjectAction
  | UpdateProjectStartAction
  | UpdateProjectSucceedAction
  | UpdateProjectClearAction
  | UpdateProjectFailedAction;
