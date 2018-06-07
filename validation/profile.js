const Validator = require("validator");
const isEmpty = require("./emptyObjectValidator");

module.exports = function validateUserProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Email field is required!";
  } else if (!Validator.isLength(data.handle, {min: 4, max: 30})) {
    errors.email = "Handle length must be between 4 and 30 characters!";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required!";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required!";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "URL is not valid!";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "URL is not valid!";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "URL is not valid!";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "URL is not valid!";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "URL is not valid!";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "URL is not valid!";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
