import axios from 'axios/index';
import {getProfile, profileIsLoading} from '../actions/profile';
import {put} from 'redux-saga/effects';

export function* getProfileSaga() {
  try {
    yield put(profileIsLoading());
    const response = yield axios.get('/api/profile');

    const payload = response.data;
    yield put(getProfile(payload));

  } catch (error) {
    yield put(getProfile({userWithoutProfile : true}));
  }
}