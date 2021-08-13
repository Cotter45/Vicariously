'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    
    const columnMapping = {
      through: 'PostCategory',
      foreignKey: 'postId',
      otherKey: 'categoryId'
    }

    Category.belongsToMany(models.Post, columnMapping)
  };
  return Category;
};
