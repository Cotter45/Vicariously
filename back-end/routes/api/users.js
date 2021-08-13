// back-end/routes/api/users.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, UserMessage, UserReview } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
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
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post('/', validateSignup, asyncHandler( async (req, res) => {
  const { email, password, username, birthday, profilePicture, description } = req.body;

  const user = await User.signup({
    username,
    email,
    password,
    birthday,
    profilePicture,
    description,
    online: true
  });

  await setTokenCookie(res, user);

  return res.json({ user });
}));

// Serve user profile
router.get('/:userId', asyncHandler( async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findByPk(userId);

  return res.json({ user })
}))

// Serve user messages
router.get('/:userId/messages', asyncHandler( async (req, res) => {
  const userId = req.params.userId;

  const messages = await UserMessage.findAll({
    where: {
      userOneId: userId
    }
  })

  return res.json({ messages })
}))

// Send a message
router.post('/:userId/messages', requireAuth, asyncHandler( async (req, res) => {
  const userTwoId = req.params.userId;
  const { id, message } = req.body;

  const newMessage = await UserMessage.create({
    message,
    read: false,
    userOneId: userId,
    userTwoId
  })

  return res.json({ newMessage })
}))

// Post a new user review
router.post('/:userId/review', requireAuth, asyncHandler( async (req, res) => {
  const userId = req.params.userId;
  const { reviewerId, rating, review } = req.body;

  const userReview = await UserReview.create({
    rating,
    review,
    reviewerId,
    userId
  })

  return res.json({ userReview })
}))


module.exports = router;
