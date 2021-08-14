'use strict';

const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
    birthday: DataTypes.DATEONLY,
    profilePicture: DataTypes.STRING,
    description: DataTypes.TEXT,
    online: DataTypes.BOOLEAN
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  }, {});

  User.associate = function(models) {
    User.hasMany(models.UserInterest, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
    User.hasMany(models.Post, { foreignKey: 'hostId', onDelete: 'CASCADE', hooks: true })
    User.hasMany(models.Booking, { foreignKey: 'guestId', onDelete: 'CASCADE', hooks: true })
    User.hasMany(models.UserReview, { foreignKey: 'reviewerId', onDelete: 'CASCADE', hooks: true })
    User.hasMany(models.UserReview, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
    User.hasMany(models.PostReview, { foreignKey: 'reviewerId', onDelete: 'CASCADE', hooks: true })
    User.hasMany(models.UserMessage, { foreignKey: 'userOneId', onDelete: 'CASCADE', hooks: true })
    User.hasMany(models.UserMessage, { foreignKey: 'userTwoId', onDelete: 'CASCADE', hooks: true })
  };

  User.prototype.toSafeObject = function() {
    const { id, username, email, online } = this;
    return { id, username, email, online };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');

    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });

    if (user && user.validatePassword(password)) {
      await user.update({ online: true })
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password, birthday, profilePicture, description, online }) {
    const hashedPassword = bcrypt.hashSync(password);

    const user = await User.create({
      username,
      email,
      hashedPassword,
      birthday,
      profilePicture,
      description,
      online,
    });

    return await User.scope('currentUser').findByPk(user.id);
  };


  return User;
};
