function catchAsync(fn) {
  return (req, res, next) => {
    try {
      fn(req, res, next);
    } catch (error) {
      res.status(404).json(error.message);
    }
  };
}

module.exports = catchAsync;