'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    imageUrl: DataTypes.TEXT,
    postId: DataTypes.INTEGER
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.Post, { foreignKey: 'postId' })
  };
  return Image;
};
