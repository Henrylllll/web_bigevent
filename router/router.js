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
            message:'登陆成功！',
            username:data[0].username
        });
      }
    })
})

router.get('/my/userinfo',function(req,res){
    var sql='SELECT * FROM userinfo where username='+"'"+req.query.username+"';"
    db.query(sql,function(err,data){
        if(req.query.Authorization==='You can access!'){
            res.send({
                status:0,
                user:{
                    nickname:data[0].nickname,
                    username:data[0].username,
                    user_pic:data[0].user_pic
                },
                data:{
                    id:data[0].id,
                    username:data[0].username,
                    nickname:data[0].nickname,
                    email:data[0].email,
                    user_pic:data[0].user_pic
                }
            })
        }else{
            res.send({
                status:-1,
                message:'身份认证失败！'
            })
        }
    })
})

router.post('/my/userinfo',function(req,res){
    var sql1='update userinfo set nickname='+"'"+req.body.nickname+"'"+' where username='+"'"+req.query.username+"';"
    var sql2='update userinfo set email='+"'"+req.body.email+"'"+' where username='+"'"+req.query.username+"';"
    db.query(sql1)
    db.query(sql2)
    res.send({
        status:0
    })
})

router.post('/my/updatepwd',function(req,res){
    var sql='update users set password='+"'"+req.body.newPwd+"'"+' where username='+"'"+req.query.username+"';"
    db.query(sql)
    res.send({
        status:0
    })
})

router.post('/my/update/avatar',function(req,res){
    var sql='update userinfo set user_pic='+"'"+req.body.avatar+"'"+' where username='+"'"+req.query.username+"';"
    db.query(sql)
    res.send({
        status:0
    })
})

module.exports = router