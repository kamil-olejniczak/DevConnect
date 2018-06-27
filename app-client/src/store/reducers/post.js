import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  posts: [],
  post: {}
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
    case actionTypes.POSTS_NOT_FOUND: {
      return {
        ...state,
        posts: action.payload
      };
    }
    case actionTypes.CREATE_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    }
    case actionTypes.REMOVE_POST: {
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    }
    case actionTypes.LIKE_POST: {
      return {
        ...state,
        posts: action.payload
      };
    }
    default:
      return state;
  }
};

export default postReducer;