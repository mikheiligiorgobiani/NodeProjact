const User = require('../db/models/users.model')
const jwt = require('jsonwebtoken')
const process = require('process')
const bcrypt = require('bcrypt')
const signale = require('signale')
const Log = require('../mongodb/models/logs.models')

const login = async ({
  email, password
}) => {
  const user = await User.findOne({
    where: {
      email
    }
  })
  const isPasswordTrue = bcrypt.compareSync(password, user.password, Number(process.env.SALT_AMOUNT))
  if (user && isPasswordTrue) {
    const token = jwt.sign({
      userId: user.id
    },
    process.env.SECRET,
    {
      expiresIn: '10h'
    }
    )
    return token
  }
  return false
}

const register = async ({
  firstName,
  lastName,
  email,
  password,
  phone
}) => {
  if (!email.includes('@') || !firstName || !lastName || password.length < 6 || phone.length < 9) {
    return { message: 'Not filled in correctly' }
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALT_AMOUNT), (err, hash) => {
      if (err) {
        throw new Error(err)
      }
      return hashedPassword
    })
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone
    })
    const creationLog = new Log({
      actionType: 'CREATED',
      dataType: 'USERS'
    })
    await creationLog.save()

    return { message: 'created' }
  } catch (e) {
    signale.error('error', e)
    return { message: 'something happened' }
  }
}
module.exports = {
  login,
  register
}
