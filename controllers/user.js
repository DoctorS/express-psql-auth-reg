const db = require('../db')
const joi = require('joi')
const bcrypt = require('bcryptjs')

module.exports.home = (req, res, next) => res.render('index', { title: 'App' })

module.exports.about = (req, res, next) => res.render('index', { title: 'About' })

module.exports.signInPage = (req, res, next) => {
  if (req.user) return res.redirect('/profile')
  res.render('index', { title: 'Sign In' })
}
module.exports.signUnPage = (req, res, next) => {
  if (req.user) return res.redirect('/profile')
  res.render('index', { title: 'Sign Un' })
}

module.exports.profile = (req, res, next) => {
  if (!req.user) return res.redirect('/sign-in')
  res.render('index', { title: 'Profile' })
}

module.exports.logout = (req, res, next) => {
  req.session.destroy((e, d) => {
    if (e) return next(e)
    res.end()
  })
}

module.exports.signUp = async (req, res, next) => {
  try {
    req.body.role = 0
    const schema = {
      firstName: joi.string(),
      lastName: joi.string(),
      role: joi.number().required(),
      email: joi.string().email().required(),
      password: joi.string().required().regex(new RegExp('^[a-zA-Z0-9]{6,32}$')),
    }
    const { error } = joi.validate(req.body, schema)
    if (error) return res.status(400).send({ error: 'validate' })
    const user = await db.User.create(req.body)
    if (!user) return res.status(400).send({ error: 'failed' })
    req.session.user = user.id
    res.send({ email: user.email, role: user.role })
  } catch (e) {
    res.status(400).send({ error: 'failed' })
  }
}
module.exports.signIn = async (req, res, next) => {
  try {
    const schema = {
      email: joi.string().email().required(),
      password: joi.string().required().regex(new RegExp('^[a-zA-Z0-9]{6,32}$')),
    }
    const { error } = joi.validate(req.body, schema)
    if (error) return res.status(400).send({ error: 'validate' })
    const user = await db.User.findOne({ where: { email: req.body.email } })
    if (!user) return res.status(400).send({ error: 'failed' })
    const checked = await bcrypt.compare(req.body.password, user.password)
    if (!checked) return res.status(400).send({ error: 'failed' })
    req.session.user = user.id
    return res.send({ email: user.email, role: user.role })
  } catch (e) {
    return res.status(400).send({ error: 'failed' })
  }
}
