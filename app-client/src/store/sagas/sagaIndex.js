import * as actionTypes from '../actions/actionTypes';
import {all, takeEvery} from 'redux-saga/effects';
import {loginUserSaga, logoutUserSaga, saveNewUserSaga} from './auth';

const watchAuth = [
  takeEvery(actionTypes.INIT_SAVE_NEW_USER, saveNewUserSaga),
  takeEvery(actionTypes.INIT_LOGIN_USER, loginUserSaga),
  takeEvery(actionTypes.INIT_LOGOUT_USER, logoutUserSaga),
];

export default function* rootSaga() {
  yield all([...watchAuth]);
}