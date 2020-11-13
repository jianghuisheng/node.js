const express = require('express')
const app = express()
const bodyParser = require('body-parser')

/**
 * 局部中间件
 */
app.get('/test1', (req, res,next) => {
  console.log('fun1')
  next()
},(req,res)=>{
  console.log('fun2');
  res.send('test1')
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(3000, () => {
  console.log('server start')
})
