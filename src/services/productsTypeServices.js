const ProductType = require('../db/models/productsType.model')

const getAllProductsType = async () => ProductType.findAll()
const createProductsType = async (typeName) => ProductType.create({ typeName }, { returning: true })
const updateProductsType = async ({ id, typeName }) => {
  const productType = await ProductType.findByPk(id)
  if (!productType) return { message: 'unable to find that productType' }
  await productType.update({ typeName }, {
    where: {
      id
    }
  })
  return { message: 'UPDATED' }
}
const deleteProductsType = async (id) => {
  const productType = await ProductType.findByPk(id)
  if (!productType) return { message: 'unable to find that productType' }
  await productType.destroy({
    where: {
      id
    }
  })
  return { message: 'DELETE' }
}
module.exports = {
  getAllProductsType,
  createProductsType,
  updateProductsType,
  deleteProductsType
}
