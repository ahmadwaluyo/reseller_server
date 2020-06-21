'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {}
  Product.init({
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      len: {
        args: [3],
        msg: 'Minimum length Brand must be at least 3 characters'
      }
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: {
        args: [5],
        msg: 'Minimum Product Name length must be at least 5 characters'
      }
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    descriptions: {
      type: DataTypes.STRING,
      len: {
        args: [8],
        msg: 'Minimum length must be at least'
      }
    }
  }, {
    sequelize,
    modelName: 'Product'
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};