const express = require('express')
const app = express()
require('./db/connect')
const bodyParser = require('body-parser')
const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')
const fileRouter = require('./router/fileRouter')
const path = require('path')
const cookieParse = require('cookie-parser')
const session = require('express-session')

// 解决跨域(一) express中间件cors
/* const cors = require('cors')
app.use(cors()) */

// 解决跨域(二) 代理方式
// 自己的页面访问自己的服务器 /cors    dhgate-layer.html 的ajax
// request 将内置的http模块封装 发起一个服务器请求 请求跨域的服务器 'http://seller.dhgate.com/aftersale/dispute/seller/afterSale/agreement/getDefaultAdress'
/* const request = require('request')
app.get('/cors', (req, res) => {
  console.log('dhgate-layer.html 的ajax')
  request(
    'http://seller.dhgate.com/aftersale/dispute/seller/afterSale/agreement/getDefaultAdress',
    (err, response, body) => {
      if (!err) {
        res.send(body)
      }
    }
  )
  // res.send('ok')
}) */

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './www')))

// 解决跨域(三)
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

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
app.use(
  '/food',
  (req, res, next) => {
    console.log(req.body)
    console.log(req.session)
    if (req.session.login) {
      next()
    } else {
      res.send({ err: -999, msg: '请先登录' })
    }
  },
  foodRouter
)
app.use('/file', fileRouter)

app.listen(4000, () => {
  console.log('server start')
})
