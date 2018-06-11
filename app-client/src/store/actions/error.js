import * as errorActions from './actionTypes';

export const saveNewUserRequestNotProcessed = errors => ({
  type: errorActions.SAVE_NEW_USER_REQUEST_NOT_PROCESSED,
  errors
});

export const loginUserRequestNotProcessed = errors => ({
  type: errorActions.LOGIN_USER_REQUEST_NOT_PROCESSED,
  errors
});

export const createProfileRequestNotProcessed = errors => ({
  type: errorActions.CREATE_PROFILE_REQUEST_NOT_PROCESSED,
  errors
});

export const cleanUpErrors = () => ({
  type: errorActions.CLEAN_UP_ERRORS
});