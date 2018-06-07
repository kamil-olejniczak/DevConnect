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