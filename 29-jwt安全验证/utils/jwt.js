const jwt = require('jsonwebtoken')
const screat = 'sldflas;asjfsldgs;yueluanyuehao'

function createToken(payload) {
  // let exp = '24h'
  let exp = 60 * 60 * 1 // 超时时间 1 小时
  return jwt.sign(payload, screat, { expiresIn: exp })
}

function checkToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, screat, (err, data) => {
      if (err) {
        reject('token 验证失败')
      }
      resolve(data)
    })
  })
}

module.exports = {
  createToken,
  checkToken,
}
