const express = require('express')
const router = express.Router() // 获取路由实例

router.get('/add', (req, res) => {
  res.send('food add')
})

router.get('/del', (req, res) => {
  res.send('food del')
})

module.exports = router
