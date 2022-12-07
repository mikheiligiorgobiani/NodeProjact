const router = require('express').Router()
const UsersController = require('../controllers/userController')

router.get('/', UsersController.getAllUsers)
router.post('/', UsersController.createUsers)
router.put('/:id', UsersController.updateUsers)
router.delete('/:id', UsersController.deleteUsers)

module.exports = router
