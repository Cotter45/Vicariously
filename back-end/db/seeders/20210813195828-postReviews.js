'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('PostReviews', [
     { rating: 5, review: 'This was the coolest thing I have ever seen!', reviewerId: 3, postId: 1 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 7, postId: 1 },
     { rating: 3, review: 'This was the coolest thing I have ever seen!', reviewerId: 4, postId: 2 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 2, postId: 2 },
     { rating: 5, review: 'This was the coolest thing I have ever seen!', reviewerId: 4, postId: 3 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 7, postId: 3 },
     { rating: 3, review: 'This was the coolest thing I have ever seen!', reviewerId: 4, postId: 4 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 2, postId: 4 },
     { rating: 5, review: 'This was the coolest thing I have ever seen!', reviewerId: 3, postId: 5 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 7, postId: 5 },
     { rating: 3, review: 'This was the coolest thing I have ever seen!', reviewerId: 4, postId: 6 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 2, postId: 6 },
     { rating: 5, review: 'This was the coolest thing I have ever seen!', reviewerId: 4, postId: 7 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 7, postId: 7 },
     { rating: 3, review: 'This was the coolest thing I have ever seen!', reviewerId: 3, postId: 8 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 2, postId: 8 },
     { rating: 5, review: 'This was the coolest thing I have ever seen!', reviewerId: 4, postId: 9 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 7, postId: 9 },
     { rating: 3, review: 'This was the coolest thing I have ever seen!', reviewerId: 4, postId: 10 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 2, postId: 10 },
     { rating: 5, review: 'This was the coolest thing I have ever seen!', reviewerId: 4, postId: 11 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 7, postId: 11 },
     { rating: 3, review: 'This was the coolest thing I have ever seen!', reviewerId: 4, postId: 12 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 2, postId: 12 },
     { rating: 5, review: 'This was the coolest thing I have ever seen!', reviewerId: 4, postId: 13 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 7, postId: 13 },
     { rating: 3, review: 'This was the coolest thing I have ever seen!', reviewerId: 3, postId: 14 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 2, postId: 14 },
     { rating: 5, review: 'This was the coolest thing I have ever seen!', reviewerId: 4, postId: 15 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 7, postId: 15 },
     { rating: 3, review: 'This was the coolest thing I have ever seen!', reviewerId: 3, postId: 16 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 2, postId: 16 },
     { rating: 5, review: 'This was the coolest thing I have ever seen!', reviewerId: 4, postId: 5 },
     { rating: 4, review: 'This was the coolest thing I have ever seen!', reviewerId: 7, postId: 5 },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('PostReviews', null, {});
  }
};
