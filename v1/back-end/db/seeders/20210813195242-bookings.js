'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Bookings', [
     { startDate: '08-15-2021', endDate: '08-21-2021', confirmed: true, postId: 1, guestId: 2 }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Bookings', null, {});
  }
};
