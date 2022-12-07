const signale = require('signale')
const UsersService = require('../services/usersServices')

// get
const getAllUsers = async (req, res) => {
  const data = await UsersService.getAllProducts()
  return res.json(data)
}
// create
const createUsers = async (req, res) => {
  const { adminId } = req.user
  const { firstName, lastName, email, password, phone, isAdmin } = req.body
  const created = await UsersService.createUsers({ firstName, lastName, email, password, phone, isAdmin, adminId })
  if (created) {
    return res.json({ message: 'USER CREATED' })
  }
  return res.json({ message: 'NOT_CREATED' })
}

const updateUsers = async (req, res) => {
  try {
    const adminId = req.users.userId
    const { userId } = req.params
    const { firsttName, lastName, email, password, phone } = req.body
    const updated = await UsersService.updateUsers({ firsttName, lastName, email, password, phone, userId, adminId })
    return res.status(200).json(updated)
  } catch (e) {
    signale.error('ERROR', e)
    return res.status(500).json({
      message: 'SERVER ERROR'
    })
  }
}

const deleteUsers = async (req, res) => {
  try {
    const adminId = req.users.userId
    const { userId } = req.params
    const deleteUser = await UsersService.deleteUsers({ userId, adminId })
    return res.json(deleteUser)
  } catch (e) {
    signale.error('ERROR', e)
    return res.status(500).json({
      message: 'SERVER ERROR'
    })
  }
}
module.exports = {
  getAllUsers,
  createUsers,
  updateUsers,
  deleteUsers
}
