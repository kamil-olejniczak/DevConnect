const Validator = require("validator");
const isEmpty = require("./emptyObjectValidator");

module.exports = function validateUserPostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : "";

    if (Validator.isEmpty(data.text)) {
        errors.text = "Text field is required!";
    } else if (!Validator.isLength(data.text, {min: 4, max: 500})) {
        errors.text = "Post length must be between 20 and 500 characters!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
