'use strict';
const { encrypt } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'Password length minimum 6 characters'
        }
      },
      allowNull: false
    },
    roles: {
      type: DataTypes.STRING,
      defaultValue: 'reseller'
    },
    phone_number: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (User, options) => {
        User.password = encrypt(User.password)
      }
    },
    sequelize,
    modelName: 'User'
  })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};