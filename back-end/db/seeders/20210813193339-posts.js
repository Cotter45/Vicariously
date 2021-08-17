'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Posts', [
     { title: 'somewhere to test your website', address: '404 Testing Ave', city: 'Test', state: 'Success', country: 'USA', lat: 39.9526, lng: 75.1652, description: 'Great spot to test a web site!', hostId: 1 }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Posts', null, {});
  }
};
