// back-end/routes/api/users.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { handleValidationErrors, validateSignup } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, UserMessage, UserReview, Post, PostReview, Image, UserInterest } = require('../../db/models');

const router = express.Router();


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

  const user = await User.findOne({
    where: {
      id: userId
    },
    include: [ UserReview, UserInterest, UserMessage ]
  });

  const posts = await Post.findAll({
    where: {
      hostId: userId
    },
    include: [ PostReview, Image ]
  })

  return res.json({ user, posts })
}))

// Serve user messages
router.get('/:userId/messages', requireAuth, asyncHandler( async (req, res) => {
  const userOneId = req.user.id;

  const messages = await UserMessage.findAll({
    where: {
      userOneId
    }
  })

  return res.json({ messages })
}))

// Send a message
router.post('/:userId/messages', requireAuth, asyncHandler( async (req, res) => {
  const userTwoId = req.params.userId;
  const userOneId = req.user.id;
  const { message } = req.body;

  const newMessage = await UserMessage.create({
    message,
    read: false,
    userOneId,
    userTwoId
  })

  return res.json({ newMessage })
}))

// Post a new user review
router.post('/:userId/review', requireAuth, asyncHandler( async (req, res) => {
  const userId = req.params.userId;
  const reviewerId = req.user.id;
  const { rating, review } = req.body;

  const userReview = await UserReview.create({
    rating,
    review,
    reviewerId,
    userId
  })

  return res.json({ userReview })
}))

// Edit a profile
router.put('/:userId', requireAuth, asyncHandler( async (req, res) => {
  const userId = req.user.id;
  const { username, email, password, birthday, profilePicture, description } = req.body;

  const hashedPassword = bcrypt.hashSync(password);

  const user = await User.findByPk(userId);

  const update = await user.update({
    username,
    email,
    hashedPassword,
    birthday,
    profilePicture,
    description,
    online: true
  });

  return res.json({ update })
}))

// Edit a user review
router.put('/:userId/reviews/:reviewId', requireAuth, asyncHandler( async (req, res) => {
  const userId = req.params.userId;
  const reviewerId = req.user.id;
  const { rating, review } = req.body;

  const userReview = await UserReview.findOne({
    where: {
      userId,
      reviewerId
    }
  })

  const update = await userReview.update({
    rating,
    review,
    reviewerId,
    userId
  })

  return res.json({ update })
}))

// Delete user account/profile
router.delete('/:userId', requireAuth, asyncHandler( async (req, res) => {
  const id = req.user.id;

  const profile = await User.findOne({ where: { id }});

  await profile.destroy();

  res.clearCookie('token');
  return res.json({ message: 'success' })
}))

router.delete('/:userId/reviews/:reviewId', requireAuth, asyncHandler( async (req, res) => {
  const userId = req.params.userId;
  const reviewerId = req.user.id;

  const userReview = await UserReview.findOne({
    where: {
      userId,
      reviewerId
    }
  })

  await userReview.destroy();

  return res.json({ message: 'success' })
}))


module.exports = router;
