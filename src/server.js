require('dotenv').config()
require('./db')// როგორც კი დაისტარტება მოხდება მონაცემთა ბაზასთან კავშირი
require('./mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const signale = require('signale')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))// body rom mivwvdet magito da unda installi body-parser
// app.use(routes)
app.use('/api', routes)
app.listen(5002, () => {
  signale.success('server listens to port 5002')
})
module.exports = app
