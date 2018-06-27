import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  isDataLoading: false
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DATA_IS_BEING_SEND:
    case actionTypes.POSTS_ARE_LOADING:
    case actionTypes.PROFILE_IS_LOADING:
    case actionTypes.PROFILES_ARE_LOADING: {
      return {
        isDataLoading: true
      };
    }
    case actionTypes.ADD_EDUCATION:
    case actionTypes.ADD_EXPERIENCE:
    case actionTypes.CLEAN_UP_CURRENT_PROFILE:
    case actionTypes.CREATE_POST:
    case actionTypes.CREATE_PROFILE:
    case actionTypes.DATA_WAS_SEND:
    case actionTypes.GET_GIT_HUB_REPOS:
    case actionTypes.GET_POSTS:
    case actionTypes.GET_PROFILE:
    case actionTypes.GET_PROFILE_BY_HANDLE:
    case actionTypes.GET_PROFILE_BY_ID:
    case actionTypes.GET_PROFILES:
    case actionTypes.GIT_HUB_REPOS_NOT_FOUND:
    case actionTypes.LIKE_POST:
    case actionTypes.POSTS_CAN_NOT_BE_LOADED:
    case actionTypes.POSTS_NOT_FOUND:
    case actionTypes.PROFILE_BY_HANDLE_NOT_FOUND:
    case actionTypes.PROFILE_BY_ID_NOT_FOUND:
    case actionTypes.PROFILE_CAN_NOT_BE_LOADED:
    case actionTypes.PROFILE_NOT_FOUND:
    case actionTypes.PROFILES_NOT_FOUND:
    case actionTypes.REMOVE_EDUCATION:
    case actionTypes.REMOVE_EXPERIENCE:
    case actionTypes.REMOVE_POST:
    case actionTypes.REMOVE_PROFILE_ALONG_WITH_USER:
    case actionTypes.UPDATE_PROFILE: {
      return {
        isDataLoading: false
      }
    }
    default:
      return state;
  }
};

export default commonReducer;