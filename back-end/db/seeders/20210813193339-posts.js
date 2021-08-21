'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Posts', [
     { title: 'Somewhere to test your website', address: '404 Testing Ave', city: 'Test', state: 'Success', country: 'USA', lat: 39.9526, lng: 75.1652, description: 'Great spot to test a web site! I really wish I had more time here to fully flush out all of the details!', hostId: 1 },
     { title: 'In need of a kitchen?', address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 1 },
     { title: 'Come use our pool!', address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 1 },
     { title: 'Use our theatre', address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 1 },
     { title: faker.lorem.words(), address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 2 },
     { title: faker.lorem.words(), address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 2 },
     { title: faker.lorem.words(), address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 2 },
     { title: faker.lorem.words(), address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 3 },
     { title: faker.lorem.words(), address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 3 },
     { title: faker.lorem.words(), address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 3 },
     { title: faker.lorem.words(), address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 4 },
     { title: faker.lorem.words(), address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 4 },
     { title: faker.lorem.words(), address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 4 },
     { title: faker.lorem.words(), address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 5 },
     { title: faker.lorem.words(), address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 5 },
     { title: faker.lorem.words(), address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), country: faker.address.country(), lat: faker.address.latitude(), lng: faker.address.longitude(), description: faker.lorem.paragraph(), hostId: 5 },



   ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Posts', null, {});
  }
};
