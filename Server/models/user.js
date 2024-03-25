'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../Helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cuisine,{foreignKey:"authorId"})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email:{
      type : DataTypes.STRING,
      allowNull: false,
      unique: {
        args:true,
        msg:"Email already exists"
      },
      validate: {
        notNull: {
          msg: `Email is Required`
        }, notEmpty: {
          msg: `Email is Required`
        }, isEmail:  {
          args:true,
          msg:"Email format is wrong "
        },
      },
    },
    password:{
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password is Required`
        }, notEmpty: {
          msg: `Password is Required`
        },len:{
          args:[7,255],
          msg: `Password must be at least 7 Characters`
        }
      },
    },

    role:{
      type: DataTypes.STRING,
      defaultValue: 'Staff'
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })
  return User;
};