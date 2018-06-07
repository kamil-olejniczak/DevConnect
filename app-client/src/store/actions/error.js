import * as authActions from './actionTypes';

export const saveNewUserRequestNotProcessed = errors => ({
  type: authActions.SAVE_NEW_USER_REQUEST_NOT_PROCESSED,
  errors
});