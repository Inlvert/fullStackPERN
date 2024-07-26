"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartProduct.belongsTo(models.Cart, {
        foreignKey: "cartId",
      });
      CartProduct.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }
  CartProduct.init(
    {
      cartId: {
        type: DataTypes.INTEGER,
        field: "cart_id",
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        field: "product_id",
        allowNull: false,
      },
      quantity: {
        type: DataTypes.NUMERIC,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "CartProduct",
      tableName: "cart_products",
      underscored: true
    }
  );
  return CartProduct;
};
