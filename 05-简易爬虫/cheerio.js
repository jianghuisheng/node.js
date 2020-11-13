const cheerio = require('cheerio')
// let $ = cheerio.load('<div><p>你好</p><img src="http:www.baidu.com"></div>')
// console.log($('img').attr('src'))
// console.log($('p').text())
let $ = cheerio.load(
  '<div><p>你好</p><img src="http:www.baidu.com"><img src="http:www.baidu1.com"></div>'
)
$('img').each((index,el)=>{
  console.log($(el).attr('src'));
})

