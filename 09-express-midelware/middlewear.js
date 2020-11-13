const express = require('express')
const app = express()
const bodyParser = require('body-parser')

/**
 * ==  app.use((req,res,next)=>{})
 */
app.use('/', (req, res, next) => {
  console.log('中间件')
  // next() // 是否继续往下执行
  let { token } = req.query
  if (token) {
    next()
  } else {
    res.send('缺少token')
  }
})

app.get('/test1', (req, res) => {
  console.log('test1')
  res.send('111')
  /*   let {token} = req.query
  if(token){
    res.send('ok')
  }else{
    res.send('no ok')
  } */
})

app.get('/test2', (req, res) => {
  console.log('test2')
  /*   let {token} = req.query
  if(token){
    res.send('ok')
  }else{
    res.send('no ok')
  } */
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(3000, () => {
  console.log('server start')
})
