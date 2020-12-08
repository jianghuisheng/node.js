const express = require('express')
const app = express()
require('./db/connect')
const JWT = require('./utils/jwt')
const bodyParser = require('body-parser')
const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')
const fileRouter = require('./router/fileRouter')
const path = require('path')
const cookieParse = require('cookie-parser')
const session = require('express-session')

const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './www')))

// session 配置
app.use(
  session({
    secret: 'keyboard cat', // 为了安全性的考虑设置secret属性
    cookie: { maxAge: 60 * 1000 }, // 设置过期时间
    resave: true, // 即使 session 没有被修改，也保存session值,默认为 true
    saveUninitialized: false, // 无论有没有session cookie,每次请求都设置个session cookie,默认给个标示为 connect.sid
  })
)

app.use('/user', userRouter)

// jwt的验证
app.use(
  '/food',
  (req, res, next) => {
    console.log(req.body)
    let { token } = req.body
    JWT.checkToken(token)
      .then(data => {
        next()
      })
      .catch(err => {
        res.send({ err: -998, msg: 'token 非法' })
      })
  },
  foodRouter
)

app.use('/file', fileRouter)

app.listen(4000, () => {
  console.log('server start')
})
