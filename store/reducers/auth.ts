import { updateObject } from '../../utils/utils';
import { AppActions } from '../types';
import { AuthInitialState } from '../types/auth';
import { Reducer } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import { toast } from 'react-toastify';
import { HYDRATE } from 'next-redux-wrapper';
// import { HYDRATE } from 'next-redux-wrapper';

const initialState: AuthInitialState = {
  tokens: null,
  loading: false,
};

const signInStart = (state: AuthInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
  });
};
const signInSucceed = (state: AuthInitialState, action: AppActions) => {
  if ('tokens' in action) {
    return updateObject(state, {
      tokens: action.tokens,
    });
  }
  return state;
};
const signInFailed = (state: AuthInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    toast.error(action.errorMessage);
    return updateObject(state, {
      loading: false,
    });
  }
  return state;
};
const signOut = (state: AuthInitialState, _action: AppActions) => {
  return updateObject(state, {
    tokens: null,
  });
};

const reducer: Reducer<AuthInitialState, AppActions> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case actionTypes.SIGN_IN_START:
      return signInStart(state, action);
    case actionTypes.SIGN_IN_SUCCEED:
      return signInSucceed(state, action);
    case actionTypes.SIGN_IN_FAILED:
      return signInFailed(state, action);
    case actionTypes.SIGN_OUT:
      return signOut(state, action);
    default:
      return state;
  }
};

export default reducer;
