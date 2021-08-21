'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('PostRules', [
     { rule: 'No littering', postId: 1 },
     { rule: 'No messing with my dog', postId: 1 },
     { rule: 'Please no shoes in house', postId: 1 },
     { rule: 'No littering', postId: 2 },
     { rule: 'No messing with my dog', postId: 2 },
     { rule: 'Please no shoes in house', postId: 2 },
     { rule: 'No littering', postId: 3 },
     { rule: 'No messing with my dog', postId: 3 },
     { rule: 'Please no shoes in house', postId: 3 },
     { rule: 'No littering', postId: 4 },
     { rule: 'No messing with my dog', postId: 4 },
     { rule: 'Please no shoes in house', postId: 4 },
     { rule: 'No littering', postId: 5 },
     { rule: 'No messing with my dog', postId: 5 },
     { rule: 'Please no shoes in house', postId: 5 },
     { rule: 'No littering', postId: 6 },
     { rule: 'No messing with my dog', postId: 6 },
     { rule: 'Please no shoes in house', postId: 6 },
     { rule: 'No littering', postId: 7 },
     { rule: 'No messing with my dog', postId: 7 },
     { rule: 'Please no shoes in house', postId: 7 },
     { rule: 'No littering', postId: 8 },
     { rule: 'No messing with my dog', postId: 8 },
     { rule: 'Please no shoes in house', postId: 8 },
     { rule: 'No littering', postId: 9 },
     { rule: 'No messing with my dog', postId: 9 },
     { rule: 'Please no shoes in house', postId: 9 },
     { rule: 'No littering', postId: 10 },
     { rule: 'No messing with my dog', postId: 10 },
     { rule: 'Please no shoes in house', postId: 10 },
     { rule: 'No littering', postId: 11 },
     { rule: 'No messing with my dog', postId: 11 },
     { rule: 'Please no shoes in house', postId: 11 },
     { rule: 'No littering', postId: 12 },
     { rule: 'No messing with my dog', postId: 12 },
     { rule: 'Please no shoes in house', postId: 12 },
     { rule: 'No littering', postId: 13 },
     { rule: 'No messing with my dog', postId: 13 },
     { rule: 'Please no shoes in house', postId: 13 },
     { rule: 'No littering', postId: 14 },
     { rule: 'No messing with my dog', postId: 14 },
     { rule: 'Please no shoes in house', postId: 14 },
     { rule: 'No littering', postId: 15 },
     { rule: 'No messing with my dog', postId: 15 },
     { rule: 'Please no shoes in house', postId: 15 },
     { rule: 'No littering', postId: 16 },
     { rule: 'No messing with my dog', postId: 16 },
     { rule: 'Please no shoes in house', postId: 16 },


   ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('PostRules', null, {});
  }
};
