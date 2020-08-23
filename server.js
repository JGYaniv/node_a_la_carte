const path = require('path')
const express = require('express')

const port = (process.env && process.env.PORT) || 3000
const host = (process.env && process.env.HOST) || 'localhost';

const app = express()

app.use(express.static(path.join(__dirname, 'frontend/public')));

app.use('/api', require('./routes/api'))

app.listen(port, ()=> {
  console.log(`Listenting to http://${host}:${port}/`)
})