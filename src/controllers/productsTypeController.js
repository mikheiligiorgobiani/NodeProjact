const signale = require('signale')
const ProductsTypeService = require('../services/productsTypeServices')

const getAllProductsType = async (req, res) => {
  const data = await ProductsTypeService.getAllProductsType()
  return res.json(data)
}

const createProductsType = async (req, res) => {
  const { typeName } = req.body

  const created = await ProductsTypeService.createProductsType(typeName)

  if (created) {
    return res.json({ message: 'ProductsType Created' })
  }
  return res.json({ message: 'NOT_CREATED' })
}

const updateProductsType = async (req, res) => {
  try {
    const { id } = req.params
    const { typeName } = req.body

    const message = await ProductsTypeService.updateProductsType({ id, typeName })
    return res.json(message)
  } catch (e) {
    signale.error('ERROR', e)
    return res.status(500).json({
      message: 'SERVER ERROR'
    })
  }
}

const deleteProductsType = async (req, res) => {
  const { id } = req.params
  const message = await ProductsTypeService.deleteProductsType(id)
  return res.json(message)
}
module.exports = {
  getAllProductsType,
  createProductsType,
  updateProductsType,
  deleteProductsType
}
