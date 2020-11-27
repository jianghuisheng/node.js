const express = require('express')
const router = express.Router()
const multer = require('multer')

var storage = multer.diskStorage({
  // 设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  // 给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    // var fileFormat = file.originalname.split('.')
    // 给图片加上时间戳格式防止重命名
    // 比如吧 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
    // cb(null, file.fieldname + '-' + Date.now())
    // cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
    cb(null, 'aaa.jpg')
  },
})

var upload = multer({ storage: storage })

router.post('/upload', upload.single('hehe'), (req, res) => {
  // hehe 要上传图片数据的key值 必须前后端统一
  // {
  //   'hehe':图片数据
  // }
  console.log(req.file)
  res.send('上传成功')
})

/**
 * @api {post} /food/add 添加菜品
 * @apiName addfood
 * @apiGroup Food
 *
 * @apiParam {String} name 菜名
 * @apiParam {String} price 价格
 * @apiParam {String} desc 描述
 * @apiParam {String} typename 类型名
 * @apiParam {Number} typeid 类型id
 * @apiParam {String} img 图片地址
 *
 * @apiSuccess {String} firstname Firstname of the Food.
 * @apiSuccess {String} lastname  Lastname of the Food.
 */

module.exports = router
