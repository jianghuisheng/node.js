# Markdown

## 标题

```js
console.log(111)
```

> 引用文件，内容引用

[链接地址](http://www.baidu.com)

- 有序列表
  - 1
  * 2
  - 3
- 列表 2
  1. 111
  2. xxx

# Node

## what

- chorme V8 runtime
- 事件驱动
- 非阻塞的 i/o

i/o : input output 输入输出流 正常 i/o 的操作都是阻塞的 (ajax 同步) 网络请求 数据库处理 文件的读写。。。
优点 ：高并发特别好 (例如淘宝 11.11 买东西)

## why

1. 防止甩锅，明确数据交互的错误问题在谁
2. 能够书写 api 斜杠青年
3. 了解前后端的交互流程
4. 全干

## api 接口

- [api 接口文档](http://47.95.207.1:3000/apidoc)

## js 运行环境

- 浏览器
  - 基本语法
  - bom
  - dom
  - ajax
  - 系统文件数据库（不能，不是语言不能 出于安全性考虑不能）
- 服务器
  - 基本语法
  - 能操作数据库
  - 能操作本地文件

限制语言能力的不是语言本身，而是语言的运行环境（平台）

<br />

### nvm 安装方式

[windows](https://www.cnblogs.com/gaozejie/p/10689742.html)
<br />
[mac](https://www.jianshu.com/p/262c754349bd)

### 模块化

- 内置模块（node 中提供的可以直接调用）
  - 例如 fs 文件操作
- 第三方模块
- 自定义模块
  - 创建一个模块（一个 js 文件一个模块）
  - 导出一个模块（module.exports = name）
  - 引用一个模块并且调用

#### 打印当前目录的目录树

1.  实现的效果
2.  分析功能点
    - 当前目录结构
    - 分辨是文件还是文件夹

### 内置模块 url

url 统一资源定位符
http://www.dhresource.com/user/crm/preshipment/refund_reason.html?rfxNo=22300196675&buyerId=ff808081523481a401523493523e0007&language=en

### 邮箱验证码

注册案例 1560000000 pass

- nodemailer 可以实现发邮件
- npm install nodemailer --save
- [npm 官网](https://www.npmjs.com/)

### 爬虫案例

### 网络基本知识

- web 服务器
- api 服务器

# 通过 express 框架 书写 api

### 什么是 api

ajax 2007。8
前后端分离 前端通过 ajax 请求数据
\$.get('http://www.baidu.com/user/login?us=123&ps=456',()=>{

})

http://www.baidu.com/user/login?us=123&ps=456 就是接口

通过 api 接口实现数据的请求

前端：1.斜截面 2.请求数据 3.数据处理
后端：写 api 接口

登陆接口逻辑分析

1. 接收用户传递的数据
2. 处理数据
3. 返回数据

### 快速搭建 sever 服务

```
  npm install -g express

  npm install -g express-generator //express命令行工具在4.x分离出来了

  express -e helloApp(-e ejs模板，-j jade模板)

  cd helloApp

  npm install

  npm start
```

- 一个基本的 web server 在 3000 端口打开

### express 基本使用

1.  安装 express

```
npm install express -S
```

模块（第三方）的引用 从当前目录的 node_modules 以此向上寻找

### 服务器相关

- 服务器

  1.  服务器就是一台电脑
  2.  服务器软件（apach tomcat iis ngnix node）
  3.  服务器 ip 和端口号（80）
      ip: 确定服务器主机的位置 port:确定服务器里某一个程序

- 外网
- 局域网
  1.  服务器通过网线（无线）连接
  2.  每一个电脑都会有一个 ip

### api 接口的书写

- 接收数据
  - get req.query
  - post req.body 需要 body-parser 插件进行解析
    - 注意数据格式 json x-www-form-urencode(默认) formdata

### postman 接口测试

### Promise

- 大量的异步操作 如果需要顺序执行 通过回调函数执行 会造成回调地狱
- 通过 Promise 解决回调地狱

1. 封装 Promise 函数

```
function test(){
  // 返回Promise
  return new Promise((resolve,reject)=>{
    // 需要的异步处理
    成功的时候 resolve('xxx')
    失败的时候 reject('xxx')
  })
}
```

2. 根据顺序 形成链式调用

```
   test().then().then().catch()
```

3. 捕获错误

### 中间件 middlewear

- 内置中间件 static
- 自定义中间件
- 第三方中间件 （body-parser） （拦截器）

### 静态资源目录 static

- 指定一个目录 目录可以被访问 类似于 apache(www)

### 非关系数据库（文档） mongodb

1. 下载 http://dl.mongodb.org/dl/win32/x86_64
2. 安装
   - 最后一个对号不选
   - 缺少数据库文件 c/data/db
   - 不是内部的命令 需要设置环境变量 mongod 的 bin 目录路径

### 指令

- mongodb 数据库名
- mongod 命令行启动数据库命令
- mongo 命令行操作数据库指令
- mongoose node 操作数据库的插件

### 注册登录

1. 注册登录 mongod
2. 验证码逻辑接口实现
   - 验证用户名存在
   - 获取验证码
     1. 获取邮箱验证码接口
     2. 发送邮件
     3. 邮箱和验证码保存到内存中
     4. 五分钟之内，不能重复发送
        > {111@qq.com:{ctime:第一次发送的时间戳,code:1233}}
3. apidoc 自动生成 api 接口文档

- npm install apidoc -g
- 在你的项目根目录下新建 apidoc.json 文件，该文件描述了项目对外提供接口的概要信息如名称、版本、描述、文档打开时浏览器显示标题和接口缺省访问地址。
  ```
  {
    "name": "ServiceEbikeAPIs",
    "version": "3.1.0",
    "description": "车辆服务接口文档",
    "title": "ServiceEbikeAPIs",
    "url" : "http://cjl3.rokyinfo.net:7190/api-ebike"
  }
  ```
- 使用样例

```
/**
 * @api {get} /user/login 用户登陆
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} us 用户名
 * @apiParam {String} ps 用户密码
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
// 登陆
router.post('/login', (req, res) => {
  let { us, ps } = req.body
  if (us && ps) {
    User.find({ us, ps })
      .then(data => {
        console.log(data)
        if (data.length > 0) {
          res.send({ err: 0, msg: '登录成功' })
        } else {
          res.send({ err: -2, msg: '用户名或密码不正确' })
        }
      })
      .catch(err => {
        return res.send({ err: -1, msg: '内部错误' })
      })
  } else {
    return res.send({ err: -1, msg: '参数错误' })
  }
})

```

- 生成文档 cd 到 apidoc.json 所在路径（即项目根目录）执行如下命令即可

```
apidoc -i router/ -o apidoc/
```
- 点开apidoc文件夹中index.html会发现已经生成的漂亮的api文档

### curd 餐厅管理系统

1. 增加
2. 查询分类
3. 关键字查询
4. 分页查询
5. 删除
6. 修改
7. 上传图片
