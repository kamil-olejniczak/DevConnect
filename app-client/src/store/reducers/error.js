import * as actionTypes from '../actions/actionTypes';

export const initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_NEW_USER_REQUEST_NOT_PROCESSED:
    case actionTypes.LOGIN_USER_REQUEST_NOT_PROCESSED:
    case actionTypes.CREATE_PROFILE_REQUEST_NOT_PROCESSED: {
      return action.errors
    }
    case actionTypes.CLEAN_UP_ERRORS: {
      return {};
    }
    default:
      return state;
  }
};

export default errorReducer;