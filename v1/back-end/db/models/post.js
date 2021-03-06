'use strict';

const faker = require('faker');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: {
      type: DataTypes.DECIMAL,
      defaultValue: faker.address.latitude()
    },
    lng: {
      type: DataTypes.DECIMAL,
      defaultValue: faker.address.longitude()
    },
    description: DataTypes.TEXT,
    hostId: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, { foreignKey: 'hostId' })
    Post.hasMany(models.PostRule, { foreignKey: 'postId', onDelete: 'CASCADE', hooks: true })

    const columnMapping = {
      through: 'PostCategory',
      foreignKey: 'categoryId',
      otherKey: 'postId'
    }

    Post.belongsToMany(models.Category, columnMapping)
    Post.hasMany(models.Image, { foreignKey: 'postId', onDelete: 'CASCADE', hooks: true })
    Post.hasMany(models.Booking, { foreignKey: 'postId', onDelete: 'CASCADE', hooks: true })
    Post.hasMany(models.PostReview, { foreignKey: 'postId', onDelete: 'CASCADE', hooks: true })
  };
  return Post;
};
