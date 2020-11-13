/**
 * 1. 请求网站数据
 * 2. 将数据保存为本地文件
 */
const fs = require('fs')
// const http = require('http')
// let url = 'http://www.baidu.com/'
const http = require('https')
// 被爬虫的网址
let url = 'https://www.tukuppt.com/'
// 被爬虫的json数据
let json = 'http://node.js.org/dist/index.json'
// cheerio 分析，load函数和jqeury相同
const cheerio = require('cheerio')
// bagpipe是朴灵大大做的一个在nodejs中控制并发执行的模块。
const request = require('request')
const Bagpipe = require('bagpipe')

http
  .get(url, res => {
    // 安全判断
    const { statusCode } = res // 状态码
    const contentType = res.headers['content-type'] // 文件类型
    console.log(statusCode, contentType) // 200 text/html;charset=UTF-8
    let err = null
    if (statusCode !== 200) {
      err = new Error('请求状态错误')
    } else if (!/^text\/html/.test(contentType)) {
      // 格式类型是网页
      err = new Error('请求类型错误')
    }

    // err 为真两个判断出错
    if (err) {
      console.log(err)
      res.resume() // 重置缓存
      return false
    }

    // 数据分段 只要接收数据就会触发data 事件 chunk 每次接受的数据片段
    let rawData = ''
    res.on('data', chunk => {
      console.log('----------')
      rawData += chunk.toString('utf8')
    })
    res.on('end', () => {
      // 写入网址至页面文件
      fs.writeFileSync('./test.html', rawData)
      console.log('数据传输完毕')

      // 通过cheerio 分析
      let $ = cheerio.load(rawData)
      let imgList = []
      $('img').each((index, el) => {
        imgList.push($(el).attr('src'))
        // console.log($(el).attr('src'));
      })
      console.log(imgList)
    })
  })
  .on('error', err => {
    console.log('请求错误')
  })
