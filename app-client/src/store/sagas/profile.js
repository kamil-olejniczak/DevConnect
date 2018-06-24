import axios from 'axios/index';
import * as profileActions from '../actions/profile';
import * as commonActions from '../actions/common';
import * as errorActions from '../actions/error';
import {put} from 'redux-saga/effects';
import {logoutUserSaga} from './auth';

export function* getProfileSaga() {
  try {
    yield put(profileActions.profileIsLoading());
    const response = yield axios.get('/api/profile');
    const data = response.data;

    yield put(profileActions.getProfile(data));
  } catch (error) {
    if (error.response.status === 500) {
      yield put(profileActions.profileCanNotBeLoaded());
      yield put(errorActions.serverIsOffline());
    } else {
      yield put(profileActions.profileNotFound({userWithoutProfile: true}));
    }
  }
}

export function* getProfilesSaga() {
  try {
    yield put(profileActions.profilesAreLoading());
    const response = yield axios.get('/api/profile/all');
    const data = response.data;

    yield put(profileActions.getProfiles(data));
  } catch (error) {
    yield put(profileActions.profilesNotFound({profilesNotFound: true}));
  }
}

export function* getProfileByHandleSaga({payload}) {
  try {
    yield put(profileActions.profileIsLoading());
    const response = yield axios.get('/api/profile/handle/' + payload);
    const data = response.data;

    yield put(profileActions.getProfileByHandle(data));
  } catch (error) {
    if (error.response.status === 500) {
      yield put(profileActions.profileCanNotBeLoaded());
      yield put(errorActions.serverIsOffline());
    } else {
      yield put(profileActions.profileByHandleNotFound({profileNotFound: true}));
    }
  }
}

export function* getProfileByIdSaga({payload}) {
  try {
    yield put(profileActions.profileIsLoading());
    const response = yield axios.get('/api/profile/user/' + payload);
    const data = response.data;

    yield put(profileActions.getProfileById(data));
  } catch (error) {
    if (error.response.status === 500) {
      yield put(profileActions.profileCanNotBeLoaded());
      yield put(errorActions.serverIsOffline());
    } else {
      yield put(profileActions.profileByIdNotFound({profileNotFound: true}));
    }
  }
}

export function* getGitHubReposSaga({username}) {
  const tokenFromAuthorizationHeader = axios.defaults.headers.common['Authorization'];
  delete axios.defaults.headers.common['Authorization'];
  try {
    const response = yield axios.get(
      `https://api.github.com/users/kamil-olejniczak/repos?per_page=4&sort=created:asc`); //TODO: should use username!
    const data = response.data;

    yield put(profileActions.getGitHubRepos(data));
  } catch (error) {
    yield put(profileActions.gitHubReposNotFound({reposNotFound: true}));
  } finally {
    axios.defaults.headers.common['Authorization'] = tokenFromAuthorizationHeader;
  }
}

export function* createProfileSaga({payload, history}) {
  try {
    yield put(commonActions.dataIsBeingSend());
    const response = yield axios.post('/api/profile', payload);
    history.push('/dashboard');

    yield put(profileActions.createProfile(response.data));
    yield put(errorActions.cleanUpErrors());
  } catch (error) {
    yield put(commonActions.dataWasSend());
    yield put(errorActions.createProfileRequestNotProcessed(error.response.data));
  }
}

export function* updateProfileSaga({payload, history}) {
  try {
    yield put(commonActions.dataIsBeingSend());
    const response = yield axios.put('/api/profile', payload);
    history.push('/dashboard');

    yield put(profileActions.updateProfile(response.data));
    yield put(errorActions.cleanUpErrors());
  } catch (error) {
    yield put(commonActions.dataWasSend());
    yield put(errorActions.updateProfileRequestNotProcessed(error.response.data));
  }
}

export function* removeProfileAlongWithUserSaga({history}) {
  try {
    const response = yield axios.delete('/api/profile');
    if (response.data.userWasDeleted) {
      yield* logoutUserSaga();
      history.push('/');
      yield put(profileActions.removeProfile());
    }
  } catch (error) {
    yield put(errorActions.removeProfileRequestNotProcessed(error.response.data));
  }
}

export function* addExperienceSaga({payload, history}) {
  try {
    yield put(commonActions.dataIsBeingSend());
    const response = yield axios.post('/api/profile/experience', payload);
    history.push('/dashboard');
    yield put(profileActions.addExperience(response.data));
    yield put(errorActions.cleanUpErrors());
  } catch (error) {
    yield put(commonActions.dataWasSend());
    yield put(errorActions.addExperienceRequestNotProcessed(error.response.data));
  }
}

export function* removeExperienceSaga({payload}) {
  try {
    const response = yield axios.delete('/api/profile/experience/' + payload);

    yield put(profileActions.removeExperience(response.data));
    yield put(errorActions.cleanUpErrors());
  } catch (error) {
    yield put(errorActions.removeExperienceRequestNotProcessed(error.response.data));
  }
}

export function* addEducationSaga({payload, history}) {
  try {
    yield put(commonActions.dataIsBeingSend());
    const response = yield axios.post('/api/profile/education', payload);
    history.push('/dashboard');

    yield put(profileActions.addEducation(response.data));
    yield put(errorActions.cleanUpErrors());
  } catch (error) {
    yield put(commonActions.dataWasSend());
    yield put(errorActions.addEducationRequestNotProcessed(error.response.data));
  }
}

export function* removeEducationSaga({payload}) {
  try {
    const response = yield axios.delete('/api/profile/education/' + payload);

    yield put(profileActions.removeEducation(response.data));
    yield put(errorActions.cleanUpErrors());
  } catch (error) {
    yield put(errorActions.removeEducationRequestNotProcessed(error.response.data));
  }
}