// 当前文件的执行目录
// console.log(__dirname);

// 内置fs模块
const fs = require('fs')
/**
 * 错误处理
 * 同步： try catch
 * 异步： 错误回调优先
 * c(creat) u(update) r(read) d(del)
 */

// 同步读取文件
try {
  let dirs = fs.readdirSync('./')
  console.log(dirs)
} catch (err) {
  console.log('出错了')
  console.log(err)
}

// 异步读取文件
// 错误的回调优先 在回调函数中第一个参数表示错误对象 默认null 如果出现错误err 就是错误对象
fs.readdir('./', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
