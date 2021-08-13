'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Categories', [
     { category: 'Fun' },
     { category: 'Kitchen' },
     { category: 'Cooking' },
     { category: 'Swimming' },
     { category: 'Pool' },
     { category: 'Gaming' },
     { category: 'Bathroom' },
     { category: 'Shower' },
     { category: 'BBQ' },
     { category: 'Laundry' },
     { category: 'Theater' },
     { category: 'Computer' },
     { category: 'Workspace' },
     { category: 'Sports' },
     { category: 'Basketball' },
     { category: 'Bonfire' },
     { category: 'ATV' },
     { category: 'Dirt Bikes' },
     { category: 'Mudding' },
     { category: 'Hunting' },
     { category: 'Soccer' },
     { category: 'Hockey' },
     { category: 'Football' },
     { category: 'Fire Pit' },
     { category: 'Camping' },
     { category: 'Fishing' },
     { category: 'Outdoor Fun' },
     { category: 'Storage' },
     { category: 'Parking' },
     { category: 'Playground' },
     { category: 'Relax' },
     { category: 'Overnight' },
     { category: 'Nap' },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Categories', null, {});
  }
};
