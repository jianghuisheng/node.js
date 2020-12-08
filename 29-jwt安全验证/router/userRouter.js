const express = require('express')
const router = express.Router()
const Mail = require('../utils/mail')
const User = require('../db/model/userModel')
const JWT = require('../utils/jwt')

let codes = {} // 通过内存保存验证码
/**
 * @api {get} /user/reg 用户注册
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String} us 用户名
 * @apiParam {String} ps 用户密码
 * @apiParam {String} code 验证码
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
// 注册
router.post('/reg', (req, res) => {
  let { us, ps, code } = req.body
  if (us && ps && code) {
    console.log(code)
    console.log(codes[us])
    if (codes[us] != code) {
      return res.send({ err: -4, msg: '验证码错误' })
    }
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

/**
 * @api {get} /user/login 用户登陆
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} us 用户名
 * @apiParam {String} ps 用户密码
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
// 登陆
router.post('/login', (req, res) => {
  let { us, ps } = req.body
  if (us && ps) {
    User.find({ us, ps })
      .then(data => {
        console.log(data)
        if (data.length > 0) {
          // req.session.login = true
          // req.session.name = us
          let token = JWT.createToken({ login: true, name: us})
          res.send({ err: 0, msg: '登录成功', token })
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

/**
 * @api {get} /user/logOUt 用户登陆
 * @apiName logOUt
 * @apiGroup User
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
// 登陆
router.post('/logOUt', (req, res) => {
  req.session.destroy()
  res.send({ err: 0, msg: '已退出' })
})

/**
 * @api {get} /user/getMailCode 发送邮箱验证码
 * @apiName getMailCode
 * @apiGroup User
 *
 * @apiParam {String} mail 邮箱
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
// 发送邮箱验证码
router.post('/getMailCode', (req, res) => {
  console.log(req.body)
  let { mail } = req.body
  let code = parseInt(Math.random() * 10000) // 产生随机码
  // codes[mail] = code // 放这里不管成不成功都会存
  Mail.send(mail, code)
    .then(() => {
      codes[mail] = code
      console.log(codes)
      res.send({ err: 0, msg: '验证码发送成功' })
    })
    .catch(err => {
      res.send({ err: -1, msg: '验证码发送失败' })
    })
})

module.exports = router
