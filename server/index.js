require('dotenv').config()

const path = require('path')
const express = require('express')

const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost';

const app = express()

app.use('/modules', require('./routes/modules'))

app.listen(port, ()=> {
  console.log(`Listenting to http://${host}:${port}/`)
})