let err = new Error('发生错误') // 这是一个错误对象 对象本身没有终止代码执行
console.log(err); // 打印错误对象
// throw err      // 抛出错误 终止代码执行
console.log('执行了。。。'); 

