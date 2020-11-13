const mongoose = require('mongoose')
// 连接数据库
/**
 * 报错
 * DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
 * DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
 * 解决{ useNewUrlParser: true, useUnifiedTopology: true }
 */
mongoose.connect('mongodb://localhost/1902', { useNewUrlParser: true, useUnifiedTopology: true })

// 数据库连接对象
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('db ok')
})

/*
 * 创建一个和集合相关的schema对象 类似表头
 * var Schema = mongoose.Schema;
 * 获取Schema对象 需要几个集合几张表就创建几个
 */
var userSchema = new mongoose.Schema({
  us: { type: String, required: true },
  ps: { type: String, required: true },
  age: Number,
  sex: { type: Number, default: 0 },
})

// 将Schema对象转化为数据模型 该数据对象和集合关联（‘集合名’，Schema对象） 集合名自动转为复数
var User = mongoose.model('user', userSchema)

/* 操作数据库 */
// 增
User.insertMany({ us: 'lxx', ps: '425', age: 26 })
  .then(data => {
    console.log(data)
    console.log('插入成功')
  })
  .catch(err => {
    console.log('插入失败')
  })

// 查
// User.find()
User.find({age:26})
.then((data)=>{
  console.log(data);
  console.log('查询成功');
})
.catch((err)=>{
  console.log(err);
  console.log('报错了，查询失败');
})

// 删
User.remove()
.then((data)=>{
  console.log(data);
  console.log('删除成功');
})
.catch((err)=>{
  console.log(err);
  console.log('删除失败');
})

// 改
// User.updateMany(
User.updateOne(
  { _id: '5fa4ee64c4d67f2d18473f74' },
  {
    $set: {
      sex: 2,
      us: 'lxx',
      ps: '425',
      age: 26,
      __v: 0,
    },
  }
)
  .then(data => {
    console.log(data)
    console.log('修改成功')
  })
  .catch(err => {
    console.log(err)
    console.log('修改失败')
  })
