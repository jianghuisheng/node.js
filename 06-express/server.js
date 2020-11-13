const express = require('express')
const app = express()

// 最简单的api接口
// http://localhost:3000/user/login
app.get('/user/login',(req,res)=>{
  console.log('你好');
  res.send({err:0,msg:'regist ok'})
})

app.listen(3000,()=>{
  console.log('server start');
})

