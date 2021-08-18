'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('UserInterests', [
     { interest: 'Testing out websites', userId: 1 },
     { interest: 'Testing out websites!', userId: 2 },
     { interest: 'Testing out websites!!', userId: 3 },
     { interest: 'Testing out websites!!!', userId: 4 },
     { interest: 'Testing out websitess', userId: 5 },
     { interest: 'Testing out websitesss', userId: 6 },
     { interest: 'Testing out websitessss', userId: 7 },
     { interest: 'Testing out websites', userId: 8 },
     { interest: 'Testing out websites', userId: 9 },
     { interest: 'Testing out websites', userId: 10 },
     { interest: 'Testing out websites', userId: 11 },
     { interest: 'Testing out websites', userId: 12 },
     { interest: 'Testing out websites', userId: 13 },
     { interest: 'Testing out websites', userId: 14 },
     { interest: 'Testing out websites', userId: 15 },
     { interest: 'Testing out websites', userId: 16 },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('UserInterests', null, {});
  }
};
