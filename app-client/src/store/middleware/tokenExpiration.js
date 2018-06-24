import {initTokenHasExpired, loginUser} from '../actions/auth';
import store from '../store';

const setTokenExpirationTimeAndLoginUser = (payload, timeLeft) => {
  timeLeft = timeLeft ? timeLeft : 3600;
  setTimeout(() => store.dispatch(initTokenHasExpired()), timeLeft.toFixed(0) * 1000);
  return store.dispatch(loginUser(payload));
};

export default setTokenExpirationTimeAndLoginUser;