import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagaIndex';
import authReducer from './reducers/auth';
import errorReducer from './reducers/error';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer
});

const store = createStore(rootReducer, enhancers);

sagaMiddleware.run(rootSaga);

export default store;