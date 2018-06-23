import {LOGIN_USER} from '../actions/actionTypes';
import {initTokenHasExpired} from '../actions/auth';

const tokenExpirationMiddleware = store => next => action => {
  if (action.type === LOGIN_USER) {
    setTimeout(() => store.dispatch(initTokenHasExpired()), action.timeLeft.toFixed(0) * 1000);
  }
  return next(action);
};

export default tokenExpirationMiddleware;