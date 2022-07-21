import { AuthActionTypes } from './auth';
import { DashboardActionTypes } from './dashboard';
import { HYDRATE } from 'next-redux-wrapper';

export interface HydrateAction {
  type: typeof HYDRATE;
}

// Export all action types under one AppActions type var
export type AppActions = AuthActionTypes | DashboardActionTypes | HydrateAction;
