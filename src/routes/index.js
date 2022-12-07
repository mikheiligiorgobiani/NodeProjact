const router = require('express').Router()

// როუტების მოთხოვნა
const ProductsRoutes = require('./productsRoutes')

const UsersRoutes = require('./usersRoutes')
const ProductsTypeRoutes = require('./productsTypeRoutes')
const AuthRoutes = require('./authRoutes')
const checkAuth = require('../middleware/authMiddleware')
const admin = require('../middleware/checkAdmin')

// გადამისამართება როუტებში
router.use('/auth', AuthRoutes)
router.use(checkAuth)
router.use(admin)
router.use('/products', ProductsRoutes)
router.use('/users', UsersRoutes)
router.use('/productstype', ProductsTypeRoutes)
module.exports = router
