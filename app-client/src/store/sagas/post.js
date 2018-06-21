import axios from 'axios/index';
import * as postActions from '../actions/post';
import {put} from 'redux-saga/effects';
import * as errorActions from '../actions/error';

export function* getPostsSaga() {
  try {
    yield put(postActions.postsAreLoading());
    const response = yield axios.get('/api/posts');
    const data = response.data;

    yield put(postActions.getPosts(data));
  } catch (error) {
    if (error.response.status === 500) {
      yield put(postActions.postsCanNotBeLoaded());
      yield put(errorActions.serverIsOffline({serverStatus: 'Server is currently offline! Please try again later.'}));
    } else {
      yield put(postActions.postsNotFound({postsNotFound: true}));
    }
  }
}

export function* createPostSaga({payload}) {
  try {
    const response = yield axios.post('/api/posts', payload);

    yield put(postActions.createPost(response.data));
    yield put(errorActions.cleanUpErrors());
  } catch (error) {
    yield put(errorActions.createPostRequestNotProcessed(error.response.data));
  }
}