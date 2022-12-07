const Users = require('../db/models/users.model')
const Product = require('../db/models/products.model')
const Log = require('../mongodb/models/logs.models')
const bcrypt = require('bcrypt')

const getAllUsers = async () => {
  const data = await Users.findAll({
    where: {
      deletedAt: null
    }
  })
  return data || { message: 'user not found' }
}
// add
const createUsers = async ({ adminId, firstName, lastName, email, password, phone, isAdmin }) => {
  if (!firstName || !lastName || !email || !password || !phone) {
    return { message: 'Fill in all fields' }
  }

  await Users.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    isAdmin
  })
  const createLog = new Log({
    actionType: 'CREATED',
    userId: adminId,
    dataType: 'USERS'
  })
  await createLog.save()
  return { message: 'CREATED' }
}
// UPDATE
const updateUsers = async ({ adminId, userId, firstName, lastName, email, password, phone }) => {
  const userid = await Users.findByPk(userId)
  if (!userid) {
    return { message: 'user not found' }
  }
  const hash = bcrypt.hashSync(password, Number(process.env.SALT_AMOUNT))
  await Product.update({
    firstName,
    lastName,
    email,
    password: hash,
    phone
  }, {
    where: {
      id: userId
    }
  })
  const updateUserLog = new Log({
    userId: adminId,
    actionType: 'UPDATED',
    dataType: 'USERS'
  })
  await updateUserLog.save()
  return { message: 'USER UPDATE' }
}

// delete
const deleteUsers = async ({ userId, adminId }) => {
  const userdelete = await Users.findByPk(userId)
  if (!userdelete) {
    return { message: 'user not found' }
  }
  await Users.destroy({
    deletedAt: new Date()
  }, {
    where: {
      id: userId
    }
  })
  const deletingUserLog = new Log({
    userId: adminId,
    actionType: 'DELETED',
    dataType: 'USERS'
  })
  await deletingUserLog.save()

  return { message: 'User deleted successfully' }
}
module.exports = {
  getAllUsers,
  createUsers,
  updateUsers,
  deleteUsers
}
