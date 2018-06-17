const browserErrorMiddleware = store => next => action => {
  if (typeof action.errors === 'string') {
    action.errors = {browserError: action.errors};
  }
  return next(action);
};

export default browserErrorMiddleware;