'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cuisine.init({
    name:{
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Name is Required`
        }, notEmpty: {
          msg: `Name is Required`
        }
      }
    },
    description:{
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Description is Required`
        }, notEmpty: {
          msg: `Description is Required`
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Price is Required`
        }, notEmpty: {
          msg: `Price is Required`
        }, min: {args: 10000, msg: `Price must be at least 10000`}
      }
    },
    imgUrl:{
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Image URL is Required`
        }, notEmpty: {
          msg: `Image URL is Required`
        }
      }
    },
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cuisine',
  });
  return Cuisine;
};