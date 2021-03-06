import * as profileActions from './actionTypes';

export const initGetProfile = () => ({
  type: profileActions.INIT_GET_PROFILE
});

export const getProfile = payload => ({
  type: profileActions.GET_PROFILE,
  payload
});

export const initGetProfiles = () => ({
  type: profileActions.INIT_GET_PROFILES
});

export const getProfiles = payload => ({
  type: profileActions.GET_PROFILES,
  payload
});

export const initGetProfileByHandle = payload => ({
  type: profileActions.INIT_GET_PROFILE_BY_HANDLE,
  payload
});

export const getProfileByHandle = payload => ({
  type: profileActions.GET_PROFILE_BY_HANDLE,
  payload
});

export const initGetProfileById = payload => ({
  type: profileActions.INIT_GET_PROFILE_BY_ID,
  payload
});

export const getProfileById = payload => ({
  type: profileActions.GET_PROFILE_BY_ID,
  payload
});

export const initGetGitHubRepos = username => ({
  type: profileActions.INIT_GET_GIT_HUB_REPOS,
  username
});

export const getGitHubRepos = payload => ({
  type: profileActions.GET_GIT_HUB_REPOS,
  payload
});

export const initCreateProfile = (payload, history) => ({
  type: profileActions.INIT_CREATE_PROFILE,
  payload,
  history
});

export const createProfile = payload => ({
  type: profileActions.CREATE_PROFILE,
  payload
});

export const initUpdateProfile = (payload, history) => ({
  type: profileActions.INIT_UPDATE_PROFILE,
  payload,
  history
});

export const updateProfile = payload => ({
  type: profileActions.UPDATE_PROFILE,
  payload
});

export const profileNotFound = payload => ({
  type: profileActions.PROFILE_NOT_FOUND,
  payload
});

export const profilesNotFound = payload => ({
  type: profileActions.PROFILES_NOT_FOUND,
  payload
});

export const profileByHandleNotFound = payload => ({
  type: profileActions.PROFILE_BY_HANDLE_NOT_FOUND,
  payload
});

export const profileByIdNotFound = payload => ({
  type: profileActions.PROFILE_BY_ID_NOT_FOUND,
  payload
});

export const gitHubReposNotFound = payload => ({
  type: profileActions.GIT_HUB_REPOS_NOT_FOUND,
  payload
});

export const profileIsLoading = () => ({
  type: profileActions.PROFILE_IS_LOADING
});

export const profileCanNotBeLoaded = () => ({
  type: profileActions.PROFILE_CAN_NOT_BE_LOADED
});

export const profilesAreLoading = () => ({
  type: profileActions.PROFILES_ARE_LOADING
});

export const cleanUpCurrentProfile = () => ({
  type: profileActions.CLEAN_UP_CURRENT_PROFILE
});

export const initRemoveProfile = history => ({
  type: profileActions.INIT_REMOVE_PROFILE_ALONG_WITH_USER,
  history
});

export const removeProfile = () => ({
  type: profileActions.REMOVE_PROFILE_ALONG_WITH_USER
});

export const initAddExperience = (payload, history) => ({
  type: profileActions.INIT_ADD_EXPERIENCE,
  payload,
  history
});

export const addExperience = payload => ({
  type: profileActions.ADD_EXPERIENCE,
  payload
});

export const initRemoveExperience = (payload, history) => ({
  type: profileActions.INIT_REMOVE_EXPERIENCE,
  payload,
  history
});

export const removeExperience = payload => ({
  type: profileActions.REMOVE_EXPERIENCE,
  payload
});

export const initAddEducation = (payload, history) => ({
  type: profileActions.INIT_ADD_EDUCATION,
  payload,
  history
});

export const addEducation = payload => ({
  type: profileActions.ADD_EDUCATION,
  payload
});

export const initRemoveEducation = (payload, history) => ({
  type: profileActions.INIT_REMOVE_EDUCATION,
  payload,
  history
});

export const removeEducation = payload => ({
  type: profileActions.REMOVE_EDUCATION,
  payload
});