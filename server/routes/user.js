const { Router } = require('express')
const requireLogin = require('../middleware/requireLogin')

const { userProfiles, follow, unfollow } = require('../controllers/user.controller')

const router = Router();

router.get('/user/:id', requireLogin, userProfiles)
router.put('/follow', requireLogin, follow)
router.put('/unfollow', requireLogin, unfollow)

module.exports = router