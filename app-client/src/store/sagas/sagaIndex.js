import * as actionTypes from '../actions/actionTypes';
import {all, takeEvery} from 'redux-saga/effects';
import {expiredTokenSaga, loginUserSaga, logoutUserSaga, saveNewUserSaga} from './auth';
import {
  addEducationSaga,
  addExperienceSaga,
  createProfileSaga,
  getGitHubReposSaga,
  getProfileByHandleSaga,
  getProfileByIdSaga,
  getProfileSaga,
  getProfilesSaga,
  removeEducationSaga,
  removeExperienceSaga,
  removeProfileAlongWithUserSaga,
  updateProfileSaga
} from './profile';
import {createPostSaga, getPostsSaga, likePostSaga, removePostSaga, unlikePostSaga} from './post';

const watchAuth = [
  takeEvery(actionTypes.INIT_SAVE_NEW_USER, saveNewUserSaga),
  takeEvery(actionTypes.INIT_LOGIN_USER, loginUserSaga),
  takeEvery(actionTypes.INIT_LOGOUT_USER, logoutUserSaga),
  takeEvery(actionTypes.INIT_TOKEN_HAS_EXPIRED, expiredTokenSaga),
];

const watchProfile = [
  takeEvery(actionTypes.INIT_GET_PROFILE, getProfileSaga),
  takeEvery(actionTypes.INIT_GET_PROFILES, getProfilesSaga),
  takeEvery(actionTypes.INIT_GET_PROFILE_BY_HANDLE, getProfileByHandleSaga),
  takeEvery(actionTypes.INIT_GET_PROFILE_BY_ID, getProfileByIdSaga),
  takeEvery(actionTypes.INIT_GET_GIT_HUB_REPOS, getGitHubReposSaga),
  takeEvery(actionTypes.INIT_CREATE_PROFILE, createProfileSaga),
  takeEvery(actionTypes.INIT_UPDATE_PROFILE, updateProfileSaga),
  takeEvery(actionTypes.INIT_REMOVE_PROFILE_ALONG_WITH_USER, removeProfileAlongWithUserSaga),
  takeEvery(actionTypes.INIT_ADD_EXPERIENCE, addExperienceSaga),
  takeEvery(actionTypes.INIT_REMOVE_EXPERIENCE, removeExperienceSaga),
  takeEvery(actionTypes.INIT_ADD_EDUCATION, addEducationSaga),
  takeEvery(actionTypes.INIT_REMOVE_EDUCATION, removeEducationSaga)
];

const watchPost = [
  takeEvery(actionTypes.INIT_GET_POSTS, getPostsSaga),
  takeEvery(actionTypes.INIT_CREATE_POST, createPostSaga),
  takeEvery(actionTypes.INIT_REMOVE_POST, removePostSaga),
  takeEvery(actionTypes.INIT_LIKE_POST, likePostSaga),
  takeEvery(actionTypes.INIT_UNLIKE_POST, unlikePostSaga),
];

export default function* rootSaga() {
  yield all([...watchAuth, ...watchProfile, ...watchPost]);
}