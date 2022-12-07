const router = require('express').Router()
const ProductController = require('../controllers/productsController')

router.get('/', ProductController.getAllProducts)
router.post('/', ProductController.addProduct)
router.put('/:productId', ProductController.updateProduct)
router.delete('/:productId', ProductController.deleteProduct)

module.exports = router
