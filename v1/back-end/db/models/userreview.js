'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserReview = sequelize.define('UserReview', {
    rating: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    reviewerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  UserReview.associate = function(models) {
    UserReview.belongsTo(models.User, { foreignKey: 'reviewerId' })
    UserReview.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return UserReview;
};
