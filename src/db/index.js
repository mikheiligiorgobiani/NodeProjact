const signale = require('signale')
const { Sequelize } = require('sequelize')
const process = require('process')

// მოდელები
const Product = require('./models/products.model')
const User = require('./models/users.model')
const ProductsType = require('./models/productsType.model')

const models = [Product, User, ProductsType]

const connection = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  }
);

(async () => {
  try {
    await connection.authenticate()
    signale.success('DB:connect: success')
  } catch (error) {
    signale.error('DB:connect: error')
  }
})()
// მეპინგი
models.map((m) => m.init(connection))

// ასოციაციები
User.hasMany(Product, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
})
// User.hasOne()
Product.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
})

Product.belongsTo(ProductsType, {
  foreignKey: {
    name: 'productTypeId',
    allowNull: false
  }
})
ProductsType.hasMany(Product, {
  foreignKey: {
    name: 'productTypeId',
    allowNull: false
  }
});

(async () => {
  await Promise.all(models.map((m) => m.sync({ force: false })))
})()

module.exports = connection
