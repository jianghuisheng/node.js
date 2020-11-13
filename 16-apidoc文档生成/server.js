const express = require('express')
require('./db/connect')
const bodyParser = require('body-parser')
const userRouter = require('./router/userRouter')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/user', userRouter)

app.listen(4000, () => {
  console.log('server start')
})
