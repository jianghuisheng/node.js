const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('./db/connect')
const userRouter = require('./router/userRouter')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/user', userRouter)

app.listen(3000, () => {
  console.log('server start')
})
