import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  profile: {},
  profiles: [],
  isDataLoading: false
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_IS_LOADING: {
      return {
        ...state,
        isDataLoading: true
      };
    }
    case actionTypes.GET_PROFILE:
    case actionTypes.PROFILE_NOT_FOUND: {
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
    case actionTypes.ADD_EDUCATION:
    case actionTypes.REMOVE_EXPERIENCE: {
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