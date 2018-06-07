import * as actionTypes from '../actions/actionTypes';
import {all, takeEvery} from 'redux-saga/effects';
import {saveNewUserSaga} from './auth';

const watchAuth = [
  takeEvery(actionTypes.INIT_SAVE_NEW_USER, saveNewUserSaga),
];

export default function* rootSaga() {
  yield all([
    ...watchAuth
  ]);
}