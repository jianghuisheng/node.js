const express = require('express')
const app = express()
require('./db/connect')
const bodyParser = require('body-parser')
const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './www')))

// 解决跨域
/* app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
}) */

app.use('/user', userRouter)
app.use('/food', foodRouter)

app.listen(4000, () => {
  console.log('server start')
})
