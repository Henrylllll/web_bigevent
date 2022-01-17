// 注意：每次调用$.get()或$.post()或$.ajax()的时候
// 会调用这个ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    //在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url='http://127.0.0.1:3000'+options.url

    //统一为有权限的接口，设置headers请求头
    if(options.url.indexOf('/my/')!==-1){
        options.url=options.url+'?Authorization='+localStorage.getItem('token')+'&username='+localStorage.getItem('username')
    }

    //全局统一挂载complete回调函数
    //不论成功还是失败，最终都会调用这个complete回调函数
    options.complete=function(res){
        // console.log('执行了complete回调:')
        // console.log(res)
        //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if(res.responseJSON.status===-1){
            //1.强制清空token
            localStorage.removeItem('token')
            //2.强制跳转到登陆页面
            location.href='/login.html'
        }
    }
}) 
