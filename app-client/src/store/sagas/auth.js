import axios from 'axios';
import {put} from 'redux-saga/effects';
import {loginUser, logoutUser, saveNewUser} from '../actions/auth';
import {cleanUpErrors, loginUserRequestNotProcessed, saveNewUserRequestNotProcessed} from '../actions/error';
import jwt_decode from 'jwt-decode';
import {removeJwtToken, saveJwtToken} from '../middleware/localStorage';
import {addAuthorizationHeader, removeAuthorizationHeader} from '../../utils/utils';
import {cleanUpCurrentProfile} from '../actions/profile';

export function* saveNewUserSaga({payload, history}) {
  try {
    const response = yield axios.post('/api/users/register', payload);
    yield put(saveNewUser(response.data));

    history.push('/login');
    yield put(cleanUpErrors());
  } catch (error) {
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
    yield put(loginUser(decoded));

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