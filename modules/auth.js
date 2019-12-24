module.exports.ifNoAuthRedirect = (req, res, next) => (req.user ? next() : res.redirect('/sign-in'))
module.exports.ifAuthRedirect = (req, res, next) => (req.user ? res.redirect('/profile') : next())
