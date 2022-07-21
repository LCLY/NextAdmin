import * as actionTypes from './actionTypes';
import { ITokens } from '../types/auth';

export const signIn = (username: string, password: string) => {
  return {
    type: actionTypes.SIGN_IN,
    username: username,
    password: password,
  };
};
export const signInStart = () => {
  return {
    type: actionTypes.SIGN_IN_START,
  };
};
export const signInSucceed = (tokens: ITokens) => {
  return {
    type: actionTypes.SIGN_IN_SUCCEED,
    tokens: tokens,
  };
};
export const signInFailed = (errorMessage: string) => {
  return {
    type: actionTypes.SIGN_IN_FAILED,
    errorMessage: errorMessage,
  };
};

export const signOut = () => {
  return {
    type: actionTypes.SIGN_OUT,
  };
};
