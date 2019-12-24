const db = require('../db')

module.exports = async (req, res, next) => {
  try {
    req.user = res.locals.user = null
    res.locals.url = req.url
    res.locals.path = req.path
    if (!req.session.user) return next()
    let user = await db.User.findOne({ where: { id: req.session.user } })
    if (!user) return next()
    req.user = res.locals.user = { email: user.email, role: user.role }
    next()
  } catch (e) {
    next(e)
  }
}
