'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMessage = sequelize.define('UserMessage', {
    message: DataTypes.TEXT,
    read: DataTypes.BOOLEAN,
    userOneId: DataTypes.INTEGER,
    userTwoId: DataTypes.INTEGER
  }, {});
  UserMessage.associate = function(models) {
    UserMessage.belongsTo(models.User, { foreignKey: 'userOneId' })
    UserMessage.belongsTo(models.User, { foreignKey: 'userTwoId' })
  };
  return UserMessage;
};
