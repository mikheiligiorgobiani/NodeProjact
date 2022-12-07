const AuthService = require('../services/authServices')

const login = async (req, res) => {
  const { email, password } = req.body

  const token = await AuthService.login({ email, password })

  if (token) {
    return res.status(200).json({ token })
  }

  return res.status(404).json({
    message: 'NOT_FOUND'
  })
}

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone
  } = req.body

  const message = await AuthService.register({
    firstName,
    lastName,
    email,
    password,
    phone
  })
  return res.json(message)
}
module.exports = {
  login,
  register
}
