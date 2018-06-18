import * as actionTypes from '../actions/actionTypes';
import {all, takeEvery} from 'redux-saga/effects';
import {loginUserSaga, logoutUserSaga, saveNewUserSaga} from './auth';
import {
  addEducationSaga,
  addExperienceSaga,
  createProfileSaga,
  getProfileSaga,
  getProfilesSaga,
  removeEducationSaga,
  removeExperienceSaga,
  removeProfileAlongWithUserSaga,
  updateProfileSaga
} from './profile';

const watchAuth = [
  takeEvery(actionTypes.INIT_SAVE_NEW_USER, saveNewUserSaga),
  takeEvery(actionTypes.INIT_LOGIN_USER, loginUserSaga),
  takeEvery(actionTypes.INIT_LOGOUT_USER, logoutUserSaga),
];

const watchProfile = [
  takeEvery(actionTypes.INIT_GET_PROFILE, getProfileSaga),
  takeEvery(actionTypes.INIT_GET_PROFILES, getProfilesSaga),
  takeEvery(actionTypes.INIT_CREATE_PROFILE, createProfileSaga),
  takeEvery(actionTypes.INIT_UPDATE_PROFILE, updateProfileSaga),
  takeEvery(actionTypes.INIT_REMOVE_PROFILE_ALONG_WITH_USER, removeProfileAlongWithUserSaga),
  takeEvery(actionTypes.INIT_ADD_EXPERIENCE, addExperienceSaga),
  takeEvery(actionTypes.INIT_REMOVE_EXPERIENCE, removeExperienceSaga),
  takeEvery(actionTypes.INIT_ADD_EDUCATION, addEducationSaga),
  takeEvery(actionTypes.INIT_REMOVE_EDUCATION, removeEducationSaga)
];

export default function* rootSaga() {
  yield all([...watchAuth, ...watchProfile]);
}