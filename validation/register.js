const Validator = require("validator");
const isEmpty = require("./emptyObjectValidator");

module.exports = function validateUserRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

  if (Validator.isEmpty(data.name)) {
    console.log("Username field is required");
    errors.name = "Username field is required!";
  } else if (!Validator.isLength(data.name, {min: 4, max: 30})) {
    errors.name = "Username length must be between 4 and 30 characters!";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required!";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid!";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required!";
  } else if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = "Password length must be between 6 and 30 characters!";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required!";
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords do not match!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
