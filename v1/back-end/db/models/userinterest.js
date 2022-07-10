'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserInterest = sequelize.define('UserInterest', {
    interest: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  UserInterest.associate = function(models) {
    UserInterest.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return UserInterest;
};
