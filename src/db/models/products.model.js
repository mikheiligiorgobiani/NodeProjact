const { Model } = require('sequelize')
const { DataTypes } = require('sequelize')

class Product extends Model {
  static init (connection) {
    super.init({
      productsName: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      price: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      productCondition: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      productState: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      productSize: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.TIME,
        allowNull: true
      }
    },
    {
      sequelize: connection,
      timestamps: true,
      tableName: 'products'
    }
    )
  }
}

module.exports = Product
