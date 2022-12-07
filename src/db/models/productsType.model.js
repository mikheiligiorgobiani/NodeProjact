const { Model, DataTypes } = require('sequelize')

class ProductsType extends Model {
  static init (connection) {
    super.init({
      typeName: {
        type: DataTypes.STRING(30),
        allowNull: false
      }
    },
    {
      sequelize: connection,
      tableName: 'productsType',
      timestamps: true
    }
    )
  }
}

module.exports = ProductsType
