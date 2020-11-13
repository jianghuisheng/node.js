const express = require('express')

// 实例化
const app = express()

const bodyParser = require('body-parser')

// 解析表单
app.use(bodyParser.urlencoded({ extended: false }))
// 解析json
app.use(bodyParser.json())

// parse application/json
/* app.use(bodyParser.json())
 
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
}) */

// 最简单的api接口
// http://localhost:3000/user/login
app.get('/user/login', (req, res) => {
  // params
  console.log(req.query)
  let { user, password } = req.query
  if (user === 'ywl' && password == 123) {
    res.send({ err: 0, msg: 'login ok' })
  } else {
    res.send({ err: 0, msg: 'user or pass is wrong' })
  }
})

app.post('/user/reg', (req, res) => {
  // 接受pst 数据 消息体 请求体 req.body
  console.log(req.body) // undefined
  let { user, password } = req.body
  // express 不能直接解析消息体 通过第三方插件实现解析 body-parser
  if (user === 'ywl' && password == 123) {
    res.send({ err: 0, msg: 'yes!' })
  } else {
    res.send({ err: 0, msg: 'no!' })
  }
})

app.listen(3000, () => {
  console.log('server start')
})
