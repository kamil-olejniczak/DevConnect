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

export const updateProfileRequestNotProcessed = errors => ({
  type: errorActions.UPDATE_PROFILE_REQUEST_NOT_PROCESSED,
  errors
});

export const removeProfileRequestNotProcessed = errors => ({
  type: errorActions.REMOVE_PROFILE_ALONG_WITH_USER_REQUEST_NOT_PROCESSED,
  errors
});

export const addExperienceRequestNotProcessed = errors => ({
  type: errorActions.ADD_EXPERIENCE_REQUEST_NOT_PROCESSED,
  errors
});

export const removeExperienceRequestNotProcessed = errors => ({
  type: errorActions.REMOVE_EXPERIENCE_REQUEST_NOT_PROCESSED,
  errors
});

export const addEducationRequestNotProcessed = errors => ({
  type: errorActions.ADD_EDUCATION_REQUEST_NOT_PROCESSED,
  errors
});

export const removeEducationRequestNotProcessed = errors => ({
  type: errorActions.REMOVE_EDUCATION_REQUEST_NOT_PROCESSED,
  errors
});

export const createPostRequestNotProcessed = errors => ({
  type: errorActions.CREATE_POST_REQUEST_NOT_PROCESSED,
  errors
});

export const removePostRequestNotProcessed = errors => ({
  type: errorActions.REMOVE_POST_REQUEST_NOT_PROCESSED,
  errors
});

export const cleanUpErrors = () => ({
  type: errorActions.CLEAN_UP_ERRORS
});

export const serverIsOffline = () => ({
  type: errorActions.SERVER_IS_OFFLINE
});