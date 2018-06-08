import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_NEW_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case actionTypes.LOGIN_USER: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    }
    case actionTypes.LOGOUT_USER: {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
};

export default authReducer;