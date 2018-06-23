import axios from 'axios';
import {put} from 'redux-saga/effects';
import {loginUser, logoutUser, saveNewUser} from '../actions/auth';
import {cleanUpErrors, loginUserRequestNotProcessed, saveNewUserRequestNotProcessed} from '../actions/error';
import {cleanUpCurrentProfile} from '../actions/profile';
import * as commonActions from '../actions/common';
import jwt_decode from 'jwt-decode';
import {removeJwtToken, saveJwtToken} from '../middleware/localStorage';
import {addAuthorizationHeader, removeAuthorizationHeader} from '../../utils/utils';

export function* saveNewUserSaga({payload, history}) {
  try {
    yield put(commonActions.dataIsBeingSend());
    const response = yield axios.post('/api/users/register', payload);
    history.push('/login');

    yield put(saveNewUser(response.data));
    yield put(cleanUpErrors());
  } catch (error) {
    yield put(commonActions.dataWasSend());
    yield put(saveNewUserRequestNotProcessed(error.response.data));
  }
}

export function* loginUserSaga({payload, history}) {
  try {
    const response = yield axios.post('/api/users/login', payload);
    const {token} = response.data;

    saveJwtToken(token);
    addAuthorizationHeader(token);

    const decoded = jwt_decode(token);
    const timeLeft = 3600;
    yield put(loginUser(decoded, timeLeft));

    history.push('/dashboard');
    yield put(cleanUpErrors());
  } catch (error) {
    yield put(loginUserRequestNotProcessed(error.response.data));
  }
}

export function* logoutUserSaga() {
  removeJwtToken();
  removeAuthorizationHeader();

  yield put(cleanUpCurrentProfile());
  yield put(logoutUser());
}

export function* expiredTokenSaga() {
  yield* logoutUserSaga();
  yield put(cleanUpCurrentProfile());
}