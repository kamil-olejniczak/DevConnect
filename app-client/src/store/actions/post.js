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
