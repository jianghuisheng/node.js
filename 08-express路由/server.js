const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// 引入路由
let userRouter = require('./router/userRouter')
let foodRouter = require('./router/foodRouter')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 使用路由
app.use('/user', userRouter)
app.use('/food', foodRouter)

app.listen(3000, () => {
  console.log('server start')
})
