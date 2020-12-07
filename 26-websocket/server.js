const WebSocket = require('ws')
const ws = new WebSocket.Server({ port: 8080 }, () => {
  console.log('scoket start')
})

// 链接数组
let clients = []
ws.on('connection', clinet => {
  clients.push(clinet)
  clinet.send('欢迎光临')
  clinet.on('message', msg => {
    console.log('来自前端的数据：' + msg)
    if (msg.indexOf('广播') != -1) {
      sendAll()
    }
  })
  clinet.on('close', msg => {
    console.log('前端主动断开连接')
  })
})

// 群发
function sendAll() {
  for (let index = 0; index < clients.length; index++) {
    clients[index].send('已经群发')
  }
}
