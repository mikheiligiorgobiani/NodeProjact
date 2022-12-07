const Product = require('../db/models/products.model')
const Log = require('../mongodb/models/logs.models')

// get
const getAllProducts = async ({ isAdmin, userId }) => {
  if (isAdmin === 1) {
    const data = await Product.findAll({
      attributes: ['productsName', 'price', 'productTypeId', 'productState', 'productCondition', 'productSize'],
      where: {
        deletedAt: null
      }
    })
    return data
  }
  const data = await Product.findAll({
    attributes: ['productsName', 'price', 'productTypeId', 'productState', 'productCondition', 'productSize'],
    where: {
      userId: Number(userId),
      deletedAt: null
    }
  })
  return (!data ? { message: 'data is empty' } : data)
}
// add
const addProduct = async ({ userId, productsName, price, productTypeId, productState, productCondition, productSize }) => {
  if (!productsName || !price || price < 1 || !productTypeId || !productState || !productSize) {
    return { message: 'Fill in all fields' }
  }
  await Product.create({
    userId,
    createdAt: new Date(),
    productsName,
    price,
    productCondition,
    productTypeId: Number(productTypeId),
    productState,
    productSize
  })
  const createLog = new Log({
    actionType: 'CREATED',
    userId: Product.userId,
    dataType: 'PRODUCTS'
  })
  await createLog.save()
  return { message: 'CREATED' }
}
// update
const updateProductById = async ({ productId, userId, isAdmin, productsName, price, productTypeId, productState, productCondition, productSize }) => {
  if (isAdmin === 1) {
    await Product.update({
      productsName,
      price,
      productCondition,
      productTypeId,
      productState
    }, {
      where: {
        id: productId,
        deletedAt: null
      }
    })
    // where: {

    //   ...(!isAdmin && { userId })
    //   }
    const updateProductLog = new Log({
      userId,
      productId,
      actionType: 'UPDATED',
      dataType: 'PRODUCTS'

    })
    await updateProductLog.save()
    return { message: 'UPDATED' }
  }
  await Product.update({
    productsName,
    price,
    productCondition,
    productTypeId,
    productState
  },
  {
    where: {
      id: productId,
      userId

    }
  })
  const updateProductLog = new Log({
    userId,
    productId,
    actionType: 'UPDATED',
    dataType: 'PRODUCTS'

  })
  await updateProductLog.save()
  return { message: 'UPDATED' }
}
// delete
const deleteProductById = async ({ isAdmin, userId, productId }) => {
  if (isAdmin === 1) {
    await Product.destroy({
      deletedAt: new Date()
    }, {
      where: {
        id: productId,
        deletedAt: null
      }
    })
    const deletedProductLog = new Log({
      userId,
      isAdmin,
      productId,
      actionType: 'DELETED',
      dataType: 'PRODUCTS'
    })
    await deletedProductLog.save()
    return { message: 'product delete' }
  }
  await Product.destroy({
    deletedAt: new Date()
  }, {
    where: {
      id: productId,
      userId,
      deletedAt: null
    }
  })
  const deletedProductLog = new Log({
    userId,
    isAdmin,
    productId,
    actionType: 'DELETED',
    dataType: 'PRODUCTS'
  })
  await deletedProductLog.save()
  return { message: 'product delete' }
}

module.exports = {
  getAllProducts,
  deleteProductById,
  addProduct,
  updateProductById
}
