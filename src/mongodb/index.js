const mongoose = require('mongoose')
const signale = require('signale')
const process = require('process')

const connectionString = `mongodb+srv://mikheiligiorgobiani:${process.env.mongoPass}@nodeprojact.9cxgpnc.mongodb.net/test`

try {
  mongoose.connect(connectionString)
  signale.success('MONGO:Connect Succesfuly')
} catch (e) {
  signale.error('mongoDb; error while connecting: ', e)
}
module.exports = {
  mongoose
}
