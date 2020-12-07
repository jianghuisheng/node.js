const express = require('express')
const router = express.Router()
const multer = require('multer')

var storage = multer.diskStorage({
  // 设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, 'www/images')
  },
  // 给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    /*     var fileFormat = file.originalname.split('.')
    cb(
      null,
      fileFormat[0] +
        '-' +
        new Date().getTime() +
        '_' +
        parseInt(Math.random() * 9999) +
        '.' +
        fileFormat[1]
    ) */
    let ext = file.originalname.split('.')[1]
    let tmpname = new Date().getTime() + parseInt(Math.random() * 999)
    cb(null, `${tmpname}.${ext}`)
  },
})

var upload = multer({ storage: storage })

/**
 * @api {post} /file/upload 上传图片
 * @apiName upload
 * @apiGroup Upload
 *
 * @apiParam {String} hehe 文件
 *
 * @apiSuccess {String} firstname Firstname of the Food.
 * @apiSuccess {String} lastname  Lastname of the Food.
 */
// 多图上传
// router.post('/upload', upload.array('hehe',2), (req, res) => {
// 单图上传
router.post('/upload', upload.single('hehe'), (req, res) => {
  // hehe 要上传图片数据的key值 必须前后端统一
  // {
  //   'hehe':图片数据
  // }
  console.log(req.file)
  let { size, mimetype, path, originalname } = req.file
  let types = ['jpg', 'jpeg', 'png', 'gif']
  let tmpType = mimetype.split('/')[1]
  if (size >= 500 * 1024) {
    return res.send({ err: -1, msg: '尺寸不能超过5M' })
  } else if (types.indexOf(tmpType) == -1) {
    return res.send({ err: -2, msg: '请上传图片类型' })
  } else {
    let url = '/images/' + req.file.filename
    res.send({ msg: '图片上传成功', img: url })
  }
})

module.exports = router
