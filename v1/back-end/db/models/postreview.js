'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostReview = sequelize.define('PostReview', {
    rating: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    reviewerId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  PostReview.associate = function(models) {
    PostReview.belongsTo(models.Post, { foreignKey: 'postId' })
    PostReview.belongsTo(models.User, { foreignKey: 'reviewerId' })
  };
  return PostReview;
};
