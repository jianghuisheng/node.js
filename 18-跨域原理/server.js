const express = require('express')
const app = express()
require('./db/connect')
const bodyParser = require('body-parser')
const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')
const path = require('path')

// 解决跨域(一) express中间件cors
/* const cors = require('cors')
app.use(cors()) */

// 解决跨域(二) 代理方式
// 自己的页面访问自己的服务器 /cors    dhgate-layer.html 的ajax
// request 将内置的http模块封装 发起一个服务器请求 请求跨域的服务器 'http://seller.dhgate.com/aftersale/dispute/seller/afterSale/agreement/getDefaultAdress'
const request = require('request')
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
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './www')))

// 解决跨域(三)
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
