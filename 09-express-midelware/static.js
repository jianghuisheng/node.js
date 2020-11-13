const express = require('express')
const app = express()
const path = require('path')

app.get('/', (req, res) => {
  res.send('Hello World')
})

// console.log(__dirname) // E:\UP\node.js\09-express-midelware
// console.log(path.join(__dirname, './www')) // E:\UP\node.js\09-express-midelware\www
/**
 *  设置静态目录
 *  访问http:localhost:3000/demo.html  http://192.168.126.236:3000/images/girls.jpg
 *  域名：3000 直接指向规定的静态目录
 */
// app.use('/public',express.static(path.join(__dirname, './www'))) // http:localhost:3000/public/demo.html
app.use(express.static(path.join(__dirname, './www')))

app.listen(3000, () => {
  console.log('server start')
})
