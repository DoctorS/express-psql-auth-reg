const { Sequelize, DataTypes } = require('sequelize')
const User = require('./user')
const config = require('config')

const sequelize = new Sequelize(config.DB_URL, {
  logging: false
})

sequelize.sync()

module.exports = {
  sequelize,
  User: User(sequelize, DataTypes)
}
