import * as actionTypes from '../actions/actionTypes';

export const initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_NEW_USER_REQUEST_NOT_PROCESSED:
    case actionTypes.LOGIN_USER_REQUEST_NOT_PROCESSED:
    case actionTypes.CREATE_PROFILE_REQUEST_NOT_PROCESSED:
    case actionTypes.UPDATE_PROFILE_REQUEST_NOT_PROCESSED:
    case actionTypes.REMOVE_PROFILE_ALONG_WITH_USER_REQUEST_NOT_PROCESSED:
    case actionTypes.ADD_EXPERIENCE_REQUEST_NOT_PROCESSED:
    case actionTypes.REMOVE_EXPERIENCE_REQUEST_NOT_PROCESSED:
    case actionTypes.ADD_EDUCATION_REQUEST_NOT_PROCESSED:
    case actionTypes.REMOVE_EDUCATION_REQUEST_NOT_PROCESSED:
    case actionTypes.CREATE_POST_REQUEST_NOT_PROCESSED:
    case actionTypes.REMOVE_POST_REQUEST_NOT_PROCESSED: {
      return action.errors
    }
    case actionTypes.SERVER_IS_OFFLINE: {
      return {
        serverStatus: 'Server is currently offline! Please try again later.'
      }
    }
    case actionTypes.CLEAN_UP_ERRORS: {
      return {};
    }
    default:
      return state;
  }
};

export default errorReducer;