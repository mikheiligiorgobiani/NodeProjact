const admin = (req, res, next) => {
  const { isAdmin } = req.user
  if (isAdmin === 1) {
    return next()
  }

  return res.status(404).json({ message: 'You cant enter' })
}

module.exports = admin
