import * as profileActions from './actionTypes';

export const initGetProfile = () => ({
  type: profileActions.INIT_GET_PROFILE
});

export const getProfile = (payload) => ({
  type: profileActions.GET_PROFILE,
  payload
});

export const initGetProfiles = () => ({
  type: profileActions.INIT_GET_PROFILES
});

export const getProfiles = () => ({
  type: profileActions.GET_PROFILES
});

export const profileNotFound = () => ({
  type: profileActions.PROFILE_NOT_FOUND
});

export const profileIsLoading = () => ({
  type: profileActions.PROFILE_IS_LOADING
});

export const cleanUpCurrentProfile = () => ({
  type: profileActions.CLEAN_UP_CURRENT_PROFILE
});