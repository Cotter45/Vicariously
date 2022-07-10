'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('PostCategories', [
     { postId: 1, categoryId: 1 },
     { postId: 1, categoryId: 12 },
     { postId: 2, categoryId: 1 },
     { postId: 2, categoryId: 11 },
     { postId: 3, categoryId: 1 },
     { postId: 3, categoryId: 10 },
     { postId: 4, categoryId: 1 },
     { postId: 4, categoryId: 12 },
     { postId: 5, categoryId: 1 },
     { postId: 5, categoryId: 12 },
     { postId: 6, categoryId: 1 },
     { postId: 6, categoryId: 12 },
     { postId: 7, categoryId: 1 },
     { postId: 7, categoryId: 12 },
     { postId: 8, categoryId: 1 },
     { postId: 8, categoryId: 12 },
     { postId: 9, categoryId: 1 },
     { postId: 9, categoryId: 12 },
     { postId: 10, categoryId: 1 },
     { postId: 10, categoryId: 12 },
     { postId: 11, categoryId: 1 },
     { postId: 11, categoryId: 12 },
     { postId: 12, categoryId: 1 },
     { postId: 12, categoryId: 12 },
     { postId: 13, categoryId: 1 },
     { postId: 13, categoryId: 12 },
     { postId: 14, categoryId: 1 },
     { postId: 14, categoryId: 12 },
     { postId: 15, categoryId: 1 },
     { postId: 15, categoryId: 12 },
     { postId: 16, categoryId: 1 },
     { postId: 16, categoryId: 12 },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('PostCategories', null, {});
  }
};
