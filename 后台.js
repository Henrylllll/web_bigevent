const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router/router')//引用模块
const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// 全局 中间件  解决所有路由的 跨域问题
app.all('*',function (req,res,next) {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type')
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS')
    next()
})
app.use(router)
app.listen(3000,function () {
    console.log('启动完毕，over!')
})
