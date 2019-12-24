const config = require('./config')

module.exports = {
  DB_URL: `postgres://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}/${config.DB_NAME}`
}
