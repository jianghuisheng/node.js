const express = require('express')
require('./db/connect')
const bodyParser = require('body-parser')
const userRouter = require('./router/userRouter')
const Mail = require('./utils/mail')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/user', userRouter)

// 发送邮箱验证码
app.post('/getMailCode',(req,res)=>{
  console.log(req.body)
  let {mail} = req.body
  let code = parseInt(Math.random()*10000)
  Mail.send(mail,code)
  .then(()=>{
    res.send({err:0,msg:'验证码发送成功'})
  })
  .catch((err)=>{
    res.send({err:-1,msg:'验证码发送失败'})
  })
})

app.listen(3000, () => {
  console.log('server start')
})
