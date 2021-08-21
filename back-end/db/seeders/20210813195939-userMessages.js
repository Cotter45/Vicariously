'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('UserMessages', [
     { message: 'Hey I know it says booked but can I still come over?', read: true, userOneId: 2, userTwoId: 1,  },
     { message: 'No', read: false, userOneId: 1, userTwoId: 2 }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('UserMessages', null, {});
  }
};
