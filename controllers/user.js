const db = require('../db')
const joi = require('joi')
const bcrypt = require('bcryptjs')

module.exports.get = async (req, res, next) => res.send({})

module.exports.logout = async (req, res, next) => {
  req.session.user = null
  res.end()
}

module.exports.signUp = async (req, res, next) => {
  try {
    req.body.role = 0
    const schema = {
      firstName: joi.string(),
      lastName: joi.string(),
      role: joi.number().required(),
      email: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .required()
        .regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
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
      email: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .required()
        .regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
    }
    const { error } = joi.validate(req.body, schema)
    if (error) return res.status(400).send({ error: 'validate' })
    const user = await db.User.findOne({ where: { email: req.body.email } })
    if (!user) return res.status(400).send({ error: 'failed' })
    const checked = await bcrypt.compare(req.body.password, user.password)
    if (!checked) return res.status(400).send({ error: 'failed' })
    req.session.user = user.id
    res.send({ email: user.email, role: user.role })
  } catch (e) {
    res.status(400).send({ error: 'failed' })
  }
}
