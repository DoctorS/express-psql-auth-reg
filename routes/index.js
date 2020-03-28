const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/', controllers.user.home)
router.get('/about', controllers.user.about)
router.get('/sign-in', controllers.user.signInPage)
router.get('/sign-up', controllers.user.signUnPage)
router.get('/profile', controllers.user.profile)

router.post('/sign-in', controllers.user.signIn)
router.post('/sign-up', controllers.user.signUp)
router.post('/logout', controllers.user.logout)

module.exports = router
