import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  profile: {},
  profiles: [],
  isDataLoading: false
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_IS_LOADING:
    case actionTypes.PROFILES_ARE_LOADING: {
      return {
        ...state,
        isDataLoading: true
      };
    }
    case actionTypes.PROFILE_CAN_NOT_BE_LOADED: {
      return {
        ...state,
        isDataLoading: false
      }
    }
    case actionTypes.GET_PROFILE:
    case actionTypes.PROFILE_NOT_FOUND: {
      return {
        ...state,
        profile: action.payload,
        isDataLoading: false
      };
    }
    case actionTypes.GET_PROFILES:
    case actionTypes.PROFILES_NOT_FOUND: {
      return {
        ...state,
        profiles: action.payload,
        isDataLoading: false
      };
    }
    case actionTypes.GET_PROFILE_BY_HANDLE:
    case actionTypes.PROFILE_BY_HANDLE_NOT_FOUND: {
      return {
        ...state,
        profile: action.payload,
        isDataLoading: false
      };
    }
    case actionTypes.CREATE_PROFILE:
    case actionTypes.UPDATE_PROFILE: {
      return {
        ...state,
        profile: action.payload,
        isDataLoading: false
      }
    }
    case actionTypes.REMOVE_PROFILE_ALONG_WITH_USER:
    case actionTypes.CLEAN_UP_CURRENT_PROFILE: {
      return {...initialState}
    }
    case actionTypes.ADD_EXPERIENCE:
    case actionTypes.REMOVE_EXPERIENCE:
    case actionTypes.ADD_EDUCATION:
    case actionTypes.REMOVE_EDUCATION: {
      return {
        ...state,
        profile: action.payload,
        isDataLoading: false
      };
    }
    default:
      return state;
  }
};

export default profileReducer;