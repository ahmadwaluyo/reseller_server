'use strict';
const { encrypt } = require('../helpers/bcrypt');

const data = [{
    "email": "admin@mail.com",
    "username" : "admin",
    "password" : encrypt("admin"),
    "phone_number": '092830918309',
    "roles" : "admin",
    "address": "Jakarta",
    "createdAt" : new Date(),
    "updatedAt" : new Date()
}]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', data);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
