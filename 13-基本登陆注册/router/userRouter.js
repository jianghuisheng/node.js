const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
// var userSchema = new mongoose.Schema({
//   us: { type: String, required: true },
//   ps: { type: String, required: true },
//   age: Number,
//   sex: { type: Number, default: 0 },
// })
// var User = mongoose.model('user', userSchema)

const User = require('../db/model/userModel')

// 注册
router.post('/reg', (req, res) => {
  let { us, ps } = req.body
  if (us && ps) {
    User.find({ us })
      .then(data => {
        // 用户名不存在 可以注册
        if (data.length === 0) {
          return User.insertMany({ us: us, ps: ps })
        } else {
          res.send({ err: -3, msg: '用户名已存在' })
        }
      })
      .then(() => {
        res.send({ err: 0, msg: '注册成功' })
      })
      .catch(err => {
        res.send({ err: -2, msg: '注册err' })
      })
  } else {
    return res.send({ err: -1, msg: '参数错误' })
  }
})

// 登陆
router.post('/login', (req, res) => {
  let { us, ps } = req.body
  if (us && ps) {
    User.find({ us, ps })
      .then(data => {
        console.log(data)
        if (data.length > 0) {
          res.send({ err: 0, msg: '登录成功' })
        } else {
          res.send({ err: -2, msg: '用户名或密码不正确' })
        }
      })
      .catch(err => {
        return res.send({ err: -1, msg: '内部错误' })
      })
  } else {
    return res.send({ err: -1, msg: '参数错误' })
  }
})

module.exports = router
