'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    hostId: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, { foreignKey: 'hostId' })
    Post.hasMany(models.PostRule, { foreignKey: 'postId' })

    const columnMapping = {
      through: 'PostCategory',
      foreignKey: 'categoryId',
      otherKey: 'postId'
    }

    Post.belongsToMany(models.Category, columnMapping)
    Post.hasMany(models.Image, { foreignKey: 'postId' })
    Post.hasMany(models.Booking, { foreignKey: 'postId' })
    Post.hasMany(models.PostReview, { foreignKey: 'postId' })
  };
  return Post;
};
