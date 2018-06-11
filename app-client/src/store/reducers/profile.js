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
    case actionTypes.CREATE_PROFILE: {
      return {
        ...state,
        profile: action.payload,
        isDataLoading: false
      }
    }
    case actionTypes.CLEAN_UP_CURRENT_PROFILE: {
      return {...initialState}
    }
    default:
      return state;
  }
};

export default profileReducer;