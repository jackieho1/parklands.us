let Sequelize = require('sequelize');
let bcrypt = require('bcrypt');
let db = require('../schema.js');

let Users = db.define('user', {
  firstName: {
    type: sequelize.STRING
  },
  lastName: {
    type: sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  }
});

User.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.validatePW = (enteredPW, storedPW) => {
  return bcrypt.compareSync(enteredPW, storedPW);
};

module.exports = User;
