'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    confirmed: DataTypes.BOOLEAN,
    postId: DataTypes.INTEGER,
    guestId: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.Post, { foreignKey: 'postId' })
    Booking.belongsTo(models.User, { foreignKey: 'guestId' })
  };
  return Booking;
};
