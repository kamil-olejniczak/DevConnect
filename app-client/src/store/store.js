import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagaIndex';
import authReducer from './reducers/auth';
import errorReducer from './reducers/error';
import profileReducer from './reducers/profile';
import browserErrorMiddleware from './middleware/browserError';
import postReducer from './reducers/post';
import commonReducer from './reducers/common';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware, browserErrorMiddleware));

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  errors: errorReducer,
  post: postReducer,
  profile: profileReducer
});

const store = createStore(rootReducer, enhancers);

sagaMiddleware.run(rootSaga);

export default store;