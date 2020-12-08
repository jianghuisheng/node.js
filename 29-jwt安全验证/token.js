const jwt = require('jsonwebtoken')

// 产生token的私钥
let screat = 'sldflas;asjfsldgs;yueluanyuehao'
// 传递的数据
let payload = {
  us: 'ywl',
  ps: 123,
}

// 产生一个token
// hs256加密 数据 载荷
// let token = jwt.sign(payload, screat)
// console.log(token)
// let token = '1.2.3'
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cyI6Inl3bCIsInBzIjoxMjMsImlhdCI6MTYwNzMyNzE4NX0.tn6Mp48M6uv08lJG7kbZ5osc3X4EgLoXlbP0b3TiSb0'

// 验证token的合法性
jwt.verify(token, screat, (err, data) => {
  console.log(err)
  console.log(data)
})
