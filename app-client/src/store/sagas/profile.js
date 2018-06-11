import axios from 'axios/index';
import {createProfile, getProfile, profileIsLoading, profileNotFound} from '../actions/profile';
import {put} from 'redux-saga/effects';
import {cleanUpErrors, createProfileRequestNotProcessed} from '../actions/error';

export function* getProfileSaga() {
  try {
    yield put(profileIsLoading());
    const response = yield axios.get('/api/profile');

    const payload = response.data;
    yield put(getProfile(payload));

  } catch (error) {
    yield put(profileNotFound({userWithoutProfile: true}));
  }
}

export function* createProfileSaga({payload, history}) {
  try {
    const response = yield axios.post('/api/profile', payload);
    yield put(createProfile(response.data));

    history.push('/dashboard');
    yield put(cleanUpErrors());
  } catch (error) {
    yield put(createProfileRequestNotProcessed(error.response.data));
  }
}