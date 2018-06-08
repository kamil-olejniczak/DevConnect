import * as authActions from './actionTypes';

export const initSaveNewUser = (payload, history) => ({
  type: authActions.INIT_SAVE_NEW_USER,
  payload,
  history
});

export const saveNewUser = payload => ({
  type: authActions.SAVE_NEW_USER,
  payload
});

export const initLoginUser = (payload, history) => ({
  type: authActions.INIT_LOGIN_USER,
  payload,
  history
});

export const loginUser = (payload) => ({
  type: authActions.LOGIN_USER,
  payload
});

export const initLogoutUser = () => ({
  type: authActions.INIT_LOGOUT_USER,
});

export const logoutUser = () => ({
  type: authActions.LOGOUT_USER
});