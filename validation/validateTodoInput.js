const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTodoInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';

  // empty
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field must not be empty'
  }

  // minimum length and max length
  if (!Validator.isLength(data.title, { min: 2, max: 50 })) {
    errors.title = 'Title must not be less than 2 or more than 50'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

}