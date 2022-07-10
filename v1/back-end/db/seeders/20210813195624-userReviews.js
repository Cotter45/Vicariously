'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('UserReviews', [
     { rating: 5, review: 'Demo is a fantastic host!, his websites are so cool!', reviewerId: 2, userId: 6 },
     { rating: 3, review: 'This is a test, but let me tell you, this was the best test there ever wa3', reviewerId: 3, userId: 4 },
     { rating: 2, review: 'Sometimes things are better off without a comment', reviewerId: 5, userId: 6 },
     { rating: 3, review: 'Demo is a fantastic host!, his websites are so cool!', reviewerId: 2, userId: 7 },
     { rating: 2, review: 'Sometimes things are better off without a comment', reviewerId: 3, userId: 5 },
     { rating: 3, review: 'This is a test, but let me tell you, this was the best test there ever wa3', reviewerId: 2, userId: 6 },
     { rating: 5, review: 'Sometimes things are better off without a comment', reviewerId: 1, userId: 7 },
     { rating: 2, review: 'Demo is a fantastic host!, his websites are so cool!', reviewerId: 5, userId: 1 },
     { rating: 5, review: 'Sometimes things are better off without a comment', reviewerId: 3, userId: 7 },
     { rating: 3, review: 'Demo is a fantastic host!, his websites are so cool!', reviewerId: 1, userId: 6 },
     { rating: 5, review: 'This is a test, but let me tell you, this was the best test there ever wa3', reviewerId: 2, userId: 4 },
     { rating: 2, review: 'Demo is a fantastic host!, his websites are so cool!', reviewerId: 2, userId: 7 },
     { rating: 5, review: 'Sometimes things are better off without a comment', reviewerId: 3, userId: 7 },
     { rating: 3, review: 'Demo is a fantastic host!, his websites are so cool!', reviewerId: 2, userId: 6 },
     { rating: 2, review: 'This is a test, but let me tell you, this was the best test there ever wa3', reviewerId: 2, userId: 4 },
     { rating: 5, review: 'Demo is a fantastic host!, his websites are so cool!', reviewerId: 5, userId: 7 },
     { rating: 3, review: 'Sometimes things are better off without a comment', reviewerId: 2, userId: 1 },
     { rating: 2, review: 'Demo is a fantastic host!, his websites are so cool!', reviewerId: 1, userId: 5 },
     { rating: 3, review: 'This is a test, but let me tell you, this was the best test there ever wa3', reviewerId: 2, userId: 5 },
     { rating: 5, review: 'Demo is a fantastic host!, his websites are so cool!', reviewerId: 5, userId: 6 },
     { rating: 2, review: 'Sometimes things are better off without a comment', reviewerId: 2, userId: 7 },
     { rating: 3, review: 'This is a test, but let me tell you, this was the best test there ever wa3', reviewerId: 2, userId: 3 },
     { rating: 5, review: 'Demo is a fantastic host!, his websites are so cool!', reviewerId: 2, userId: 6 },
     { rating: 3, review: 'Sometimes things are better off without a comment', reviewerId: 5, userId: 1 },

   ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('UserReviews', null, {});
  }
};
