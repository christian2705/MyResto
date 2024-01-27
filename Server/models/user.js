'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:{
        args:true,
        msg:"email already in use"
      },
      validate:{
        notNull:{
          msg:"email is required"
        },
        notEmpty:{
          msg:"email is required"
        },
        isEmail:{
          args:true,
          msg:"Must be in email format"
        }
      }
      
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"password is required"
        },
        notEmpty:{
          msg:"password is required"
        },
        len: {
          args:[7,255],
          msg:"Password must be at least 7 characters"
        }
      }
    },
    role:{
      type:DataTypes.STRING,
      defaultValue:'Staff'
    },
    phonenumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};