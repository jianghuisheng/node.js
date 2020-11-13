const fs = require('fs')
// 创建
fs.mkdir('./test',(err,data)=>{
  console.log(err);
  // console.log(data); //undefined
})

// 更改
fs.rename('./test','./test01',err=>{
  if(err){
    console.log('更改失败');
  }else{
    console.log('ok');
  }
})

// 删除 只能删除空文件夹
fs.rmdir('./test', err => {
  if (err) {
    console.log('删除失败')
    console.log(err) // directory not empty
  } else {
    console.log('ok')
  }
})
