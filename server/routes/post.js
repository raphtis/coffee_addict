const { Router } = require('express');
const requireLogin = require('../middleware/requireLogin')

const { createPost, getAll, myPosts, like, unlike, comment, deletePost, deleteComment, getSubPost } = require('../controllers/post.controller')

const router = Router();

router.get('/all_posts', requireLogin, getAll)
router.get('/my_posts', requireLogin, myPosts)
router.get('/subscribed_posts',requireLogin, getSubPost)

router.post('/createpost', requireLogin, createPost)

router.put('/like', requireLogin, like)
router.put('/unlike', requireLogin, unlike)
router.put('/comment', requireLogin, comment)

router.delete('/delete_post/:postId', requireLogin, deletePost)
router.delete('/delete_comment/:postId/:commentId', requireLogin, deleteComment)

module.exports = router
