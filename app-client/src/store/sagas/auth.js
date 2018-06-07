import axios from 'axios';
import {put} from 'redux-saga/effects';
import {saveNewUser} from '../actions/auth';
import {saveNewUserRequestNotProcessed} from '../actions/error';

export function* saveNewUserSaga({payload, history}) {
  try {
    const response = yield axios.post('/api/users/register', payload);
    yield put(saveNewUser(response.data));
    history.push('/login');
  } catch (error) {
    yield put(saveNewUserRequestNotProcessed(error.response.data));
  }
}