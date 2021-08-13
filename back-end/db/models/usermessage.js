'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMessage = sequelize.define('UserMessage', {
    message: DataTypes.TEXT,
    read: DataTypes.BOOLEAN,
    userOneId: DataTypes.INTEGER,
    userTwoId: DataTypes.INTEGER
  }, {});
  UserMessage.associate = function(models) {
    // associations can be defined here
  };
  return UserMessage;
};