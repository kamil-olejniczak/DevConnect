import * as postActions from './actionTypes';

export const initGetPosts = () => ({
  type: postActions.INIT_GET_POSTS
});

export const getPosts = payload => ({
  type: postActions.GET_POSTS,
  payload
});

export const postsNotFound = payload => ({
  type: postActions.POSTS_NOT_FOUND,
  payload
});

export const postsAreLoading = () => ({
  type: postActions.POSTS_ARE_LOADING
});

export const postsCanNotBeLoaded = () => ({
  type: postActions.POSTS_CAN_NOT_BE_LOADED
});

export const initCreatePost = payload => ({
  type: postActions.INIT_CREATE_POST,
  payload,
});

export const createPost = payload => ({
  type: postActions.CREATE_POST,
  payload
});

export const initRemovePost = payload => ({
  type: postActions.INIT_REMOVE_POST,
  payload
});

export const removePost = payload => ({
  type: postActions.REMOVE_POST,
  payload
});

export const initLikePost = payload => ({
  type: postActions.INIT_LIKE_POST,
  payload
});

export const likePost = payload => ({
  type: postActions.LIKE_POST,
  payload
});

export const initUnlikePost = payload => ({
  type: postActions.INIT_UNLIKE_POST,
  payload
});

export const unlikePost = payload => ({
  type: postActions.UNLIKE_POST,
  payload
});

