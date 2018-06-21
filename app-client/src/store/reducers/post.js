import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  posts: [],
  post: {},
  isDataLoading: false
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POSTS_ARE_LOADING: {
      return {
        ...state,
        isDataLoading: true
      };
    }
    case actionTypes.POSTS_CAN_NOT_BE_LOADED: {
      return {
        ...state,
        isDataLoading: false
      }
    }
    case actionTypes.GET_POSTS:
    case actionTypes.POSTS_NOT_FOUND: {
      return {
        ...state,
        posts: action.payload,
        isDataLoading: false
      };
    }
    case actionTypes.CREATE_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        isDataLoading: false
      }
    }
    default:
      return state;
  }
};

export default postReducer;