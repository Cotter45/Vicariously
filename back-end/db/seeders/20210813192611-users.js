'use strict';

const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
     { username: 'demo', email: 'demo@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '01-01-1980', profilePicture: 'https://thumbs.dreamstime.com/b/demo-seal-watermark-distress-texture-red-vector-rubber-print-demo-text-dust-texture-text-tag-placed-double-135335018.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
     { username: 'spuds', email: 'spuds@demo.com', hashedPassword: bcrypt.hashSync('password'), birthday: '02-02-1980', profilePicture: 'https://thumbs.dreamstime.com/b/demo-seal-watermark-distress-texture-red-vector-rubber-print-demo-text-dust-texture-text-tag-placed-double-135335018.jpg', description: 'I am a demo user for anyone testing out this sites functionality!', online: false },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
