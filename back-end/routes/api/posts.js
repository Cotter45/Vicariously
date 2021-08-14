// back-end/routes/api/posts.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Post, Booking, Category, Image, PostReview, PostRule } = require('../../db/models');

const router = express.Router();


// Serve spots by most popular
router.get('/', asyncHandler( async (req, res) => {
    const posts = await Post.findAll({
        include: [ Category, Image, PostReview ],
    })

    posts.sort((a, b) => {
        a.PostReviews.rating - b.PostReviews.rating
    })

    console.log(posts[0].PostReviews)
    return res.json({ posts });
}))

// Route to create new post
router.post('/', requireAuth, asyncHandler( async (req, res) => {
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

module.exports = router;
