/* setTimeout(()=>{
  console.log(1)
},1000)
setTimeout(()=>{
  console.log(2)
},2000) */

/* setTimeout(() => {
  setTimeout(() => {
    console.log(2)
  }, 1000)
  console.log(1)
}, 1000) */

const fs = require('fs')

fs.stat('./hehe.js', (err, stats) => {
  if (err) {
    console.log('文件不存在')
  } else {
    fs.unlink('./hehe.js', err => {
      console.log(err)
      fs.writeFile('./test.js', 'xxxxxxxxxxx', err => {
        console.log(err)
      })
    })
  }
})

/**
 * 异步操作需要保持一定的执行顺序 回调函数的嵌套 回调地狱
 * 解决： promise asyc/awiat(es7) 蓝鸟... 7种方法
 */

/**
 * what is Promise
 * Promise是抽象异步处理对象以及对其进行各种操作的组件。Promise并不是从JavaScript中发祥的概念。
 * Promise最初被提出是在E语言中，它是基于并列/并行处理设计的一种编程语言。
 * 现在JavaScrip也拥有了这种特性，这就是JavaScript Promise
 */

function delfile() {
  return new Promise((resolve, reject) => {
    // resolve('成功了') // then
    // reject('失败了')  // catch
    // 异步操作
    fs.unlink('./hehe.js', err => {
      if (err) {
        reject('失败了')
      } else {
        resolve('成功了')
      }
    })
  })
}
delfile()
  .then(msg => {
    console.log('then:' + msg)
  })
  .catch(err => {
    console.log('err:' + err)
  })
