import * as err from '../actions/actionTypes';
const errorActions = [
  err.SAVE_NEW_USER_REQUEST_NOT_PROCESSED,
  err.LOGIN_USER_REQUEST_NOT_PROCESSED,
  err.CREATE_PROFILE_REQUEST_NOT_PROCESSED,
  err.UPDATE_PROFILE_REQUEST_NOT_PROCESSED,
  err.REMOVE_PROFILE_ALONG_WITH_USER_REQUEST_NOT_PROCESSED,
  err.ADD_EXPERIENCE_REQUEST_NOT_PROCESSED,
  err.REMOVE_EXPERIENCE_REQUEST_NOT_PROCESSED,
  err.ADD_EDUCATION_REQUEST_NOT_PROCESSED,
];
const browserErrorMiddleware = store => next => action => {
  let isErrorAction = errorActions.filter(type => action.type === type).length !== 0;
  if (isErrorAction) {
    action.errors = {browserError: action.errors};
  }
  return next(action);
};

export default browserErrorMiddleware;