// back-end/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const postsRouter = require('./posts.js');
const mapsRouter = require('./maps');

router.use('/session', sessionRouter);
router.use('/maps', mapsRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);


module.exports = router;
