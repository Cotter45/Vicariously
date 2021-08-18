// back-end/routes/api/posts.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const { validatePost } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Post, Booking, Category, Image, PostReview, PostRule, UserMessage, UserReview } = require('../../db/models');

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
    const hostId = req.body.user.id;
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
        },
        include: [ PostReview, User, Image ]
    })

    for (let i = 0; i < results.length; i++) {
        const post = results[i];
        const postReviews = await PostReview.findAll({
            where: {
                postId: post.id
            }
        })
        const sum = postReviews.reduce((prev, curr) => prev + curr.rating, 0);
        const avg = sum / postReviews.length;
        let stars = '';
        for (let i = 0; i < avg; i++) {
            stars += '⭐️'
        }
        for (let i = stars.length; i < 7; i++) {
            stars += '✭'
        }
        results[i].dataValues.avgRating = stars;
    }

    return res.json({ results })
}))

// Route to serve up full details on a specific post
router.get('/:postId', asyncHandler( async (req, res) => {
    const post = await Post.findOne({
        where: {
            id: parseInt(req.params.postId)
        },
        include: [ Category, Image, Booking, PostReview, User, PostRule ]
    })


    const postReviews = await PostReview.findAll({
        where: {
            postId: post.id
        },
        include: User
    })

    const userReviews = await UserReview.findAll({
        where: {
            id: post.hostId
        },
        include: User
    })

    const sum = postReviews.reduce((prev, curr) => prev + curr.rating, 0);
    const avg = sum / postReviews.length;
    let stars = '';
    for (let i = 0; i < avg; i++) {
        stars += '⭐️'
    }
    for (let i = stars.length; i < 7; i++) {
        stars += '✭'
    }
    post.dataValues.avgRating = stars;

    const secondSum = userReviews.reduce((prev, curr) => prev + curr.rating, 0);
    const secondAvg = secondSum / userReviews.length;
    let secondStars = '';
    for (let i = 0; i < secondAvg; i++) {
        secondStars += '⭐️'
    }
    for (let i = secondStars.length; i < 7; i++) {
        secondStars += '✭'
    }
    post.dataValues.numUserRatings = userReviews.length;
    post.dataValues.avgUserRating = secondStars;
    post.dataValues.postReviews = postReviews;
    post.dataValues.userReviews = userReviews;


    return res.json({ post });
}))

// Route to book a posting
router.post('/:postId/bookings', requireAuth, asyncHandler( async (req, res) => {
    const postId = req.params.postId;
    const guestId = req.body.user.id;
    const { startDate, endDate } = req.body;
    console.log('postId', postId, 'guestId', guestId, 'startDate', startDate, 'endDate', endDate)
    console.log(req.body)
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
        message: `${req.body.user.username} would like to visit you!`,
        read: false,
        userOneId: req.body.user.id,
        userTwoId: post.User.id
    })

    return res.json({ booking, newMessage });
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
    const userOneId = req.body.user.id;

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

    return res.json({ message: 'success' })
}))

// Route to add a review to a posting
router.post('/:postId/review', requireAuth, asyncHandler( async (req, res) => {
    const reviewerId = req.body.user.id;
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
    const hostId = req.body.user.id;

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
    const reviewerId = req.body.user.id;
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
    const guestId = req.body.user.id;
    const { startDate, endDate } = req.body;

    const booking = await Booking.findOne({
        where: {
            id
        },
        include: [ Post, User ]
    });

    if (booking.guestId === guestId) {
        await booking.update({
            startDate,
            endDate,
            confirmed: false
        })
    }

    const newMessage = await UserMessage.create({
        message: `${req.body.user.username} would like to change their reservation`,
        read: false,
        userOneId: guestId,
        userTwoId: booking.User.id
    })

    return res.json({ message: 'success' })
}))

// Route to delete a posting if owner of posting
router.delete('/:postId', requireAuth, asyncHandler( async (req, res) => {
    const id = req.params.postId;
    const hostId = req.body.user.id;

    const post = await Post.findOne({
        where: {
            id,
            hostId
        }
    })

    if (post.hostId === hostId) {
        await post.destroy();
    }

    return res.json({ message: 'success' })
}))

// Route to delete a review if owner of review
router.delete('/:postId/reviews/:reviewId', requireAuth, asyncHandler( async (req, res) => {
    const id = req.params.reviewId;
    const postId = req.params.postId;
    const reviewerId = req.body.user.id;

    const review = await PostReview.findOne({
        where: {
            id,
            postId
        }
    })

    if (review.reviewerId === reviewerId) {
        await review.destroy();
    }

    return res.json({ message: 'success' })
}))

// Route to delete a booking if you're the host or guest
router.delete('/:postId/bookings/:bookingId', requireAuth, asyncHandler( async (req, res) => {
    const id = req.params.bookingId;

    const booking = await Booking.findOne({
        where: {
            id
        },
        include: Post
    });

    const newMessage = await UserMessage.create({
        message: `${req.body.user.username} has cancelled this reservation.`,
        read: false,
        userOneId: booking.Post.hostId,
        userTwoId: booking.guestId
    })

    await booking.destroy()

    return res.json({ message: 'success' })
}))




module.exports = router;
