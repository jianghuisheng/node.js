const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server) // 将socket服务器和express进行结合 好处websocket和node服务器共用一个接口

io.on('connection', function (client) {
  client.emit('hehe', '欢迎光临')
})
// server.listen(8081, '0.0.0.0') // 允许所有的端口访问
io.listen(8081, { origins: '*:*' }) // 允许所有的端口访问
