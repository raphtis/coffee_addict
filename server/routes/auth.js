const { Router } = require('express');
const requireLogin = require('../middleware/requireLogin')

const { healthCheck, signup, login, protected } = require('../controllers/auth.controller')

const router = Router();

router.get('/healthcheck', healthCheck);
router.get('/protected', requireLogin, protected)


router.post('/signup', signup);
router.post('/login', login)


module.exports = router