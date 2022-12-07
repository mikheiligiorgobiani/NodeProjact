const ProductService = require('../services/productsServices')

const getAllProducts = async (req, res) => {
  const { isAdmin, userId } = req.users
  const data = await ProductService.getAllProducts({ isAdmin, userId })
  return res.json({ data })
}

const addProduct = async (req, res) => {
  const { userId } = req.users
  const { productsName, price, productCondition, productState, productSize } = req.body
  const result = await ProductService.addProduct({ userId, productsName, price, productCondition, productState, productSize })
  return res.json(result)
}

const updateProduct = async (req, res) => {
  try {
    const { isAdmin, userId } = req.users
    const { productsName, price, productTypeId, productState, productCondition, productSize } = req.body
    const { productId } = req.params
    const result = await ProductService.updateProductById({ isAdmin, productId, userId, productsName, price, productTypeId, productState, productCondition, productSize })
    return res.json({ result })
  } catch (e) {
    return res.status(500).json({
      message: 'SERVER ERROR'
    })
  }
}
const deleteProduct = async (req, res) => {
  try {
    const { isAdmin, userId } = req.users
    const { productId } = req.params

    const result = await ProductService.deleteProductById({ isAdmin, userId, productId })

    return res.json(result)
  } catch (e) {
    return res.status(500).json({
      message: 'SERVER ERROR'
    })
  }
}
module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
}
