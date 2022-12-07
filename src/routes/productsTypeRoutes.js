const router = require('express').Router()
const ProductTypeController = require('../controllers/productsTypeController')
router.get('/', ProductTypeController.getAllProductsType)
router.post('/', ProductTypeController.createProductsType)
router.put('/:id', ProductTypeController.updateProductsType)
router.delete('/:id', ProductTypeController.deleteProductsType)
module.exports = router
