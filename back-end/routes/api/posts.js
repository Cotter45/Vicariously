// back-end/routes/api/posts.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const { validatePost } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Post, Booking, Category, Image, PostReview, PostRule, UserMessage } = require('../../db/models');

const router = express.Router();


// Serve spots by most recent and highest rated, limit 10
router.get('/', asyncHandler( async (req, res) => {
    const posts = await Post.findAll({
        include: [ Category, Image, PostReview ],
        order: [ [ 'createdAt', 'DESC' ], [ PostReview, 'rating', 'DESC' ] ],
        limit: 10
    })

    return res.json({ posts });
}))

// Route to create new post
router.post('/', validatePost, requireAuth, asyncHandler( async (req, res) => {
    const hostId = req.user.id;
    const { address, city, state, country, lat, lng, description, imageUrl } = req.body;

    const newPost = await Post.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        description,
        hostId
    })

    const newImage = await Image.create({
        imageUrl,
        postId: newPost.id
    })

    return res.json({ newPost, newImage });
}))

// Route to serve posts based on a city, state or country parameter
router.get('/search/:params', asyncHandler( async (req, res) => {
    const params = req.params.params.toLowerCase().split(' ').concat(req.params.params.toUpperCase().split(' '));
    console.log(req.params.params)

    const results = await Post.findAll({
        where: {
            [Op.or]: [
                {
                    state: {
                        [Op.or]: {
                            [Op.in]: params,
                            [Op.substring]: req.params.params,
                            [Op.iRegexp]: req.params.params

                        }
                    }
                },
                {
                    city: {
                        [Op.or]: {
                            [Op.in]: params,
                            [Op.substring]: req.params.params,
                            [Op.iRegexp]: req.params.params
                        }
                    }
                },
                {
                    country: {
                        [Op.or]: {
                            [Op.in]: params,
                            [Op.substring]: req.params.params,
                            [Op.iRegexp]: req.params.params
                        }
                    }
                }
            ]
        }
    })

    return res.json({ results })
}))

// Route to serve up full details on a specific post
router.get('/:postId', asyncHandler( async (req, res) => {
    const post = await Post.findOne({
        where: {
            id: req.params.postId
        },
        include: [ Category, Image, Booking, PostReview ]
    })

    return res.json({ post });
}))

// Route to book a posting
router.post('/:postId/bookings', requireAuth, asyncHandler( async (req, res) => {
    const postId = req.params.postId;
    const guestId = req.user.id;
    const { startDate, endDate } = req.body;

    const post = await Post.findOne({
        where: {
            id: postId
        },
        include: User
    })

    const booking = await Booking.create({
        startDate,
        endDate,
        confirmed: false,
        postId,
        guestId
    })

    const newMessage = await UserMessage.create({
        message: `${req.user.username} would like to visit you!`,
        read: false,
        userOneId: req.user.id,
        userTwoId: post.User.id
    })

    return res.json({ booking });
}))

// Route to get all uncomfirmed bookings for a specific post
router.get('/:postId/bookings', requireAuth, asyncHandler( async (req, res) => {
    const postId = req.params.postId;
    const bookings = await Booking.findAll({
        where: {
            postId,
            confirmed: false
        }
    })
    return res.json({ bookings });
}))


// Route to confirm a booking
router.post('/bookings/:bookingId/confirm', requireAuth, asyncHandler( async (req, res) => {
    const bookingId = req.params.bookingId;
    const userOneId = req.user.id;

    const booking = await Booking.findOne({
        where: {
            id: bookingId
        }
    })

    await booking.update({ confirmed: true })

    const guestId = booking.guestId;

    const newMessage = await UserMessage.create({
        message: 'Your booking has been confirmed!',
        read: false,
        userOneId,
        userTwoId: guestId
    })
    console.log(newMessage)

    return res.json({ message: 'success' })
}))

// Route to add a review to a posting
router.post('/:postId/review', requireAuth, asyncHandler( async (req, res) => {
    const reviewerId = req.user.id;
    const postId = req.params.postId;
    const { rating, review } = req.body;

    const newReview = await PostReview.create({
        rating,
        review,
        reviewerId,
        postId
    })

    return res.json({ newReview })
}))

// Route to edit a post
router.put('/:postId', requireAuth, asyncHandler( async (req, res) => {
    const postId = req.params.postId;
    const { address, city, state, country, lat, lng, description } = req.body;
    const hostId = req.user.id;

    const post = await Post.findOne({
        where: {
            id: postId
        }
    })

    const edit = await post.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        description,
        hostId
    })

    return res.json({ edit })
}))

// Route to edit a posts reviews
router.put('/:postId/reviews/:reviewId', requireAuth, asyncHandler( async (req, res) => {
    const id = req.params.reviewId;
    const postId = req.params.postId;
    const reviewerId = req.user.id;
    const { rating, review } = req.body;

    const postReview = await PostReview.findOne({
        where: {
            id,
            reviewerId
        }
    })

    const edit = await postReview.update({
        rating,
        review,
        reviewerId,
        postId
    })

    return res.json({ edit })
}))

// Route to update a booking if guest / change dates
router.put('/:postId/:bookingId', requireAuth, asyncHandler( async (req, res) => {
    const id = req.params.bookingId;
    const guestId = req.user.id;
    const { startDate, endDate } = req.body;

    const booking = await Booking.findOne({
        where: {
            id
        },
        include: [ Post, User ]
    });
    console.log(req.user.username)

    if (booking.guestId === guestId) {
        await booking.update({
            startDate,
            endDate,
            confirmed: false
        })
    }

    const newMessage = await UserMessage.create({
        message: `${req.user.username} would like to change their reservation`,
        read: false,
        userOneId: guestId,
        userTwoId: booking.User.id
    })

    return res.json({ message: 'success' })
}))



module.exports = router;
