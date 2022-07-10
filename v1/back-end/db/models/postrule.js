'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostRule = sequelize.define('PostRule', {
    rule: DataTypes.TEXT,
    postId: DataTypes.INTEGER
  }, {});
  PostRule.associate = function(models) {
    PostRule.belongsTo(models.Post, { foreignKey: 'postId' })
  };
  return PostRule;
};
