import axios from 'axios/index';
import * as postActions from '../actions/post';
import * as commonActions from '../actions/common';
import * as errorActions from '../actions/error';
import {put} from 'redux-saga/effects';

export function* getPostsSaga() {
  try {
    yield put(postActions.postsAreLoading());
    const response = yield axios.get('/api/posts');

    yield put(postActions.getPosts(response.data));
  } catch (error) {
    if (error.response.status === 500) {
      yield put(postActions.postsCanNotBeLoaded());
      yield put(errorActions.serverIsOffline());
    } else {
      yield put(postActions.postsNotFound({postsNotFound: true}));
    }
  }
}

export function* getPostSaga({payload}) {
  try {
    yield put(postActions.postIsLoading());
    const response = yield axios.get('/api/posts/' + payload);

    yield put(postActions.getPost(response.data));
  } catch (error) {
    if (error.response.status === 500) {
      yield put(postActions.postCanNotBeLoaded());
      yield put(errorActions.serverIsOffline());
    } else {
      yield put(postActions.postNotFound({postNotFound: true}));
    }
  }
}

export function* createPostSaga({payload}) {
  try {
    yield put(commonActions.dataIsBeingSend());
    const response = yield axios.post('/api/posts', payload);

    yield put(postActions.createPost(response.data));
    yield put(errorActions.cleanUpErrors());
  } catch (error) {
    yield put(commonActions.dataWasSend());
    yield put(errorActions.createPostRequestNotProcessed(error.response.data));
  }
}

export function* removePostSaga({payload}) {
  try {
    yield put(commonActions.dataIsBeingSend());
    yield axios.delete('/api/posts/' + payload);

    yield put(postActions.removePost(payload));
  } catch (error) {
    yield put(commonActions.dataWasSend());
    if (error.response.data.posts) {
      yield put(postActions.postsNotFound({postsNotFound: true}));
    } else {
      yield put(errorActions.removePostRequestNotProcessed(error.response.data));
    }
  }
}

export function* likePostSaga({payload}) {
  try {
    yield put(commonActions.dataIsBeingSend());
    const response = yield axios.post('/api/posts/like/' + payload);

    yield put(postActions.likePost(response.data));
  } catch (error) {
    yield put(commonActions.dataWasSend());
    yield put(errorActions.likePostRequestNotProcessed(error.response.data));
  }
}

export function* unlikePostSaga({payload}) {
  try {
    yield put(commonActions.dataIsBeingSend());
    const response = yield axios.post('/api/posts/unlike/' + payload);

    yield put(postActions.unlikePost(response.data));
  } catch (error) {
    yield put(commonActions.dataWasSend());
    yield put(errorActions.unlikePostRequestNotProcessed(error.response.data));
  }
}