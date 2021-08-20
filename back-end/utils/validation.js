// back-end/utils/validation.js
const { validationResult, check } = require('express-validator');
const { User } = require('../db/models');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

// middleware for validating user sign up
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number and special character (i.e. "!@#$%^&*")'),
  handleValidationErrors,
];

// validate a new posting
const validatePost = [
  check('title')
    .exists({checkFalsy: true })
    .withMessage('Please provide a title.')
    .isLength({ min: 5, max: 100 })
    .withMessage('Please keep title within 5 and 100 characters.'),
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an address.')
    .isLength({ min: 5, max: 100 })
    .withMessage('Please provide a valid address.'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a city')
    .isLength({ min: 2, max: 100 })
    .withMessage('Please provide a valid city.'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a state.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Please provide a valid state.'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a country.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Please provide a valid country.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description.')
    .isLength({ min: 5 })
    .withMessage('Please provide a valid description.'),
  check('imageUrl')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an image URL.')
    .isURL()
    .withMessage('Please provide a valid URL.'),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateSignup,
  validatePost,
};
