const { Router } = require('express')
const requireLogin = require('../middleware/requireLogin')

const { userProfiles } = require('../controllers/user.controller')

const router = Router();

router.get('/user/:id', requireLogin, userProfiles)

module.exports = router