const express = require('express')
const router = express.Router()
const db = require('../db')
const auth = require('../modules/auth')
const controllers = require('../controllers')

router.get('/', (req, res, next) => res.render('index', { title: 'Express' }))
router.get('/about', (req, res, next) => res.render('index', { title: 'About' }))
router.get('/sign-in', auth.ifAuthRedirect, (req, res, next) => res.render('index', { title: 'Sign In' }))
router.get('/sign-up', auth.ifAuthRedirect, (req, res, next) => res.render('index', { title: 'Sign Up' }))

router.post('/sign-in', controllers.user.signIn)
router.post('/sign-up', controllers.user.signUp)
router.post('/logout', controllers.user.logout)
router.get('/profile', auth.ifNoAuthRedirect, (req, res, next) => res.render('index', { title: 'Profile' }))

module.exports = router
