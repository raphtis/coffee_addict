const { Router } = require('express')
const requireLogin = require('../middleware/requireLogin')

const { userProfiles, follow, unfollow, updatePic, searchUsers } = require('../controllers/user.controller')

const router = Router();

router.get('/user/:id', requireLogin, userProfiles)
router.put('/follow', requireLogin, follow)
router.put('/unfollow', requireLogin, unfollow)
router.put('/update_picture', requireLogin, updatePic)
router.post('/search_users', requireLogin, searchUsers)

module.exports = router