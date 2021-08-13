'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostReview = sequelize.define('PostReview', {
    rating: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    reviewerId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  PostReview.associate = function(models) {
    // associations can be defined here
  };
  return PostReview;
};