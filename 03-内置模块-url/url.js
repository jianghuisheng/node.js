const url = require('url')
/**
 * url 类比json 记忆
 * url.parse 将url字符串转成对象
 * url.format 将url对象转成字符串
 */
let urlString =
  'http://www.dhresource.com/user/crm/preshipment/refund_reason.html?rfxNo=22300196675&buyerId=ff808081523481a401523493523e0007&language=en#location1'
let urlObj = url.parse(urlString)
console.log(urlObj)

let hrefObj = {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.dhresource.com',
  port: null,
  hostname: 'www.dhresource.com',
  hash: null,
  search: '?rfxNo=22300196675&buyerId=ff808081523481a401523493523e0007&language=en',
  query: 'rfxNo=22300196675&buyerId=ff808081523481a401523493523e0007&language=en',
  pathname: '/user/crm/preshipment/refund_reason.html',
  path:
    '/user/crm/preshipment/refund_reason.html?rfxNo=22300196675&buyerId=ff808081523481a401523493523e0007&language=en',
  href:
    'http://www.dhresource.com/user/crm/preshipment/refund_reason.html?rfxNo=22300196675&buyerId=ff808081523481a401523493523e0007&language=en',
}
let hrefString = url.format(hrefObj)
console.log(hrefString)
