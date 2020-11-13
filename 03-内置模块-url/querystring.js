const qs = require('querystring')

/* parse */
let string = 'name=wenlong&pass=99&sex=1'
let obj = qs.parse(string)
console.log(obj);

// 假如一天query值变了，qs.parse(string)就需要改变
// 键值对是#切割 key值是-切割
let string = 'name-xuan#pass-90#sex-0'
let obj = qs.parse(string,'#','-')
console.log(obj);

/* stringfy */
let obj = { name: 'xuan', pass: '90', sex: '0' }
let string = qs.stringify(obj)
console.log(string); 

// 编码
let string = 'w=你好&foo=bar'
let esString = qs.escape(string)
console.log(esString);

// 解码
let escape = 'w%3D%E4%BD%A0%E5%A5%BD%26foo%3Dbar'
let unescape = qs.unescape(escape)
console.log(unescape)
