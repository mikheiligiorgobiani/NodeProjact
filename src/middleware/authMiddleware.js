const jwt = require('jsonwebtoken')
const User = require('../db/models/users.model')

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const { userId } = jwt.verify(token, 'FAFDFDSF1323J!D', (error) => {
      if (error) {
        throw new Error()
      }
    })
    const user = await User.findByPk(userId)
    req.user = {
      userId,
      isAdmin: user.isAdmin
    }
    return next()
  } catch (e) {
    res.json({ message: 'UNAUTHORIZED' })
  }
}

// const admin = (req, res, next) => {
//   const { isAdmin } = req.user
//   if (isAdmin === 1) {
//     return next()
//   }

//   return res.status(404).json({ message: 'You cant enter' })
// }
module.exports = checkAuth
