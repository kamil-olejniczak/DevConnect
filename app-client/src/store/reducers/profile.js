import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  profile: {},
  profiles: [],
  repos: []
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE:
    case actionTypes.PROFILE_NOT_FOUND: {
      return {
        ...state,
        profile: action.payload
      };
    }
    case actionTypes.GET_PROFILES:
    case actionTypes.PROFILES_NOT_FOUND: {
      return {
        ...state,
        profiles: action.payload
      };
    }
    case actionTypes.GET_PROFILE_BY_HANDLE:
    case actionTypes.PROFILE_BY_HANDLE_NOT_FOUND: {
      return {
        ...state,
        profile: action.payload
      };
    }
    case actionTypes.GET_GIT_HUB_REPOS:
    case actionTypes.GIT_HUB_REPOS_NOT_FOUND: {
      return {
        ...state,
        repos: action.payload
      };
    }
    case actionTypes.CREATE_PROFILE:
    case actionTypes.UPDATE_PROFILE: {
      return {
        ...state,
        profile: action.payload
      }
    }
    case actionTypes.CLEAN_UP_CURRENT_PROFILE:
    case actionTypes.REMOVE_PROFILE_ALONG_WITH_USER: {
      return {...initialState}
    }
    case actionTypes.ADD_EDUCATION:
    case actionTypes.ADD_EXPERIENCE:
    case actionTypes.REMOVE_EDUCATION:
    case actionTypes.REMOVE_EXPERIENCE: {
      return {
        ...state,
        profile: action.payload
      };
    }
    default:
      return state;
  }
};

export default profileReducer;