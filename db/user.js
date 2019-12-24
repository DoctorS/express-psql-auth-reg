const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync(12)
          user.password = bcrypt.hashSync(user.password, salt)
        }
      }
    }
  )
  User.associate = function(models) {
    // associations can be defined here
  }
  return User
}
