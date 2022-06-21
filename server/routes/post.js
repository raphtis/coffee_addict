const { Router } = require('express');
const requireLogin = require('../middleware/requireLogin')

const { createPost, getAll, myPosts, } = require('../controllers/post.controller')

const router = Router();

router.get('/all_posts', requireLogin, getAll)
router.get('/my_posts', requireLogin, myPosts)

router.post('/createpost', requireLogin, createPost)

module.exports = router
