const express = require('express')
const router = express.Router()
const foodModel = require('../db/model/foodModel')

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
router.post('/add', (req, res) => {
  // let data = {
  //   name: '皮蛋豆腐',
  //   price: '13',
  //   desc: '超级爽口',
  //   typename: '凉菜',
  //   typeid: 1,
  //   img: '/images/food1.jpg',
  // }
  let { name, price, desc, typename, typeid, img } = req.body
  foodModel
    .find({ name })
    .then(data => {
      if (data.length === 0) {
        return foodModel.insertMany({ name, price, desc, typename, typeid, img })
      } else {
        res.send({ err: -3, msg: '菜品已经存在' })
      }
    })
    .then(() => {
      res.send({ err: 0, msg: '添加成功' })
    })
    .catch(() => {
      res.send({ err: -1, msg: '添加失败' })
    })
})

/**
 * @api {post} /food/getInfoByType 分类查询
 * @apiName getInfoByType
 * @apiGroup Food
 *
 * @apiParam {Number} typeid 类型id
 *
 * @apiSuccess {String} firstname Firstname of the Food.
 * @apiSuccess {String} lastname  Lastname of the Food.
 */
router.post('/getInfoByType', (req, res) => {
  let typeid = req.body.typeid
  foodModel
    .find({ typeid })
    .then(data => {
      console.log(data)
      if (data.length === 0) {
        res.send({ err: -1, msg: '不存在该分类' })
      } else {
        res.send({ err: 0, msg: '查询成功', list: data })
      }
    })
    .catch(() => {
      res.send({ err: -1, msg: '查询失败' })
    })
})

/**
 * @api {post} /food/getInfoByKw 关键字查询
 * @apiName getInfoByKw
 * @apiGroup Food
 *
 * @apiParam {String} name 菜名
 * @apiParam {String} desc 描述
 *
 * @apiSuccess {String} firstname Firstname of the Food.
 * @apiSuccess {String} lastname  Lastname of the Food.
 */
router.post('/getInfoByKw', (req, res) => {
  // $set $get $or $and $regex regexp $in
  let { kw } = req.body
  let reg = new RegExp(kw) // 创建一个正则表达式 匹配关键字
  // foodModel.find({age:{$get:16}})
  // foodModel.find({name:{$regex:reg}}) 名字模糊查
  foodModel
    .find({ $or: [{ name: { $regex: reg } }, { desc: { $regex: reg } }] }) // 名字 或者 描述查询
    .then(data => {
      console.log(data)
      res.send({ err: 0, msg: '查询成功', list: data })
    })
    .catch(() => {
      res.send({ err: -1, msg: '查询失败' })
    })
})

/**
 * @api {post} /food/getInfoByType 删除菜品
 * @apiName getInfoByType
 * @apiGroup Food
 *
 * @apiParam {Number} _id id
 *
 * @apiSuccess {String} firstname Firstname of the Food.
 * @apiSuccess {String} lastname  Lastname of the Food.
 */
router.post('/del', (req, res) => {
  let { _id } = req.body
  let idAry = _id.split(',')
  let newArr = []
  newArr = idAry.map(item => ({ _id: item }))
  console.log(newArr)
  foodModel
    .deleteMany({ _id: { $in: newArr } })
    .then(data => {
      res.send({ err: 0, msg: '删除成功' })
    })
    .catch(() => {
      res.send({ err: -1, msg: '删除失败' })
    })
})

/**
 * @api {post} /food/getInfoByType 修改菜品
 * @apiName getInfoByType
 * @apiGroup Food
 *
 * @apiParam {Number} _id id
 *
 * @apiSuccess {String} firstname Firstname of the Food.
 * @apiSuccess {String} lastname  Lastname of the Food.
 */
router.post('/update', (req, res) => {
  let { name, price, desc, typename, typeid, img, _id } = req.body
  foodModel
    .find({ _id })
    .then(data => {
      console.log(data);
      if (data.length !== 0) {
        return foodModel.updateOne({ _id }, { name, price, desc, typename, typeid, img })
      } else {
        res.send({ err: -3, msg: '菜品不存在' })
      }
    })
    .then(data => {
      console.log(data)
      res.send({ err: 0, msg: '修改成功' })
    })
    .catch(() => {
      res.send({ err: -1, msg: '修改失败' })
    })
})
module.exports = router
