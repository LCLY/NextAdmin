import * as actionTypes from '../actions/actionTypes';
// defining types for actions
// initialState for reducers
export interface AuthInitialState {
  readonly tokens?: ITokens | null;
  readonly loading?: boolean;
}

export interface ITokens {
  access: string;
  refresh: string;
}

export interface SignInAction {
  type: typeof actionTypes.SIGN_IN;
  username: string;
  password: string;
}
export interface SignInStartAction {
  type: typeof actionTypes.SIGN_IN_START;
}
export interface SignInSucceedAction {
  type: typeof actionTypes.SIGN_IN_SUCCEED;
  tokens: ITokens;
}
export interface SignInFailedAction {
  type: typeof actionTypes.SIGN_IN_FAILED;
  errorMessage: string;
}
export interface SignOutAction {
  type: typeof actionTypes.SIGN_OUT;
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type AuthActionTypes =
  | SignInAction
  | SignInStartAction
  | SignInSucceedAction
  | SignInFailedAction
  | SignOutAction;
