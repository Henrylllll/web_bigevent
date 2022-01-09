const {Router} = require('express')
const path = require('path')
const router = new Router()
const mysql=require('mysql')
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'big_event'
})

db.connect()

router.post('/api/reguser',function (req,res){
    var username=req.body.username
    var password=req.body.password
    var data=[username,password]
    var sql='insert into users values (?,?);'
    db.query(sql,data,function(err){
        if(err) return res.send({
            status:1,
            message:'注册失败！'
        })

        res.send({
            status:0,
            message:'注册成功，请登录！'
        })
    })
})

router.post('/api/login',function (req,res){
    var sql='SELECT * FROM users where username='+"'"+req.body.username+"'"+' and password='+"'"+req.body.password+"'"+';';
    db.query(sql,function(err,data){
      if(!data.length){
        res.send({
            status:-1,
            message:'用户名或密码错误！'
        });
      }else{
        res.send({
            status:0,
            token:'You can access!',
            message:'登陆成功！'
        });
      }
    })
})

router.get('/my/userinfo',function(req,res){
    if(req.query.Authorization==='You can access!'){
        res.send({
            status:0,
            user:{
                nickname:'zs',
                username:'ls',
                user_pic:'/assets/images/avatar.jpg'
            }
        })
    }else{
        res.send({
            status:-1,
            message:'身份认证失败！'
        })
    }
})

module.exports = router