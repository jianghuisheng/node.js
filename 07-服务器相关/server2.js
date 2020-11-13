const express = require('express')
const app = express()

app.get('/user/login',(req,res)=>{
  console.log('你好');
  console.log(req.query)
  res.send({err:0,msg:'regist ok'})
})

app.listen(3001,()=>{
  console.log('server start');
})

