const fs = require('fs')

fs.readdir('./01-导入导出',(err,dirs)=>{
  for (let index = 0; index < dirs.length; index++) {
    console.log(dirs[index]); // a.js b.js
  }
})

// Class: fs.Stats
// fs.stat('./01-导入导出',(err,stats)=>{
fs.stat('./01-导入导出/a.js', (err, stats) => {
  if (stats.isFile()) {
    console.log("It's file")
  } else {
    console.log("It's dir")
  }
})
