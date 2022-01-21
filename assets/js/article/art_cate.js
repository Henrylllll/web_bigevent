$(function(){
    var layer=layui.layer

    initArtCateList()
    //获取文章分类的列表
    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                var htmlStr=template('tpl-table',res)
                console.log(htmlStr)
                $('tbody').html(htmlStr)
            }
        })
    }

    //为添加类别按钮绑定点击事件
    var indexAdd=null
    $('#btnAddCate').on('click',function(){
        indexAdd=layer.open({
            type:1,
            area:['500px','250px'],
            'title':'添加文章分类',
            'content':$('#dialog-add').html()
        })
    })

    //通过代理的形式为form-add表单绑定submit事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                //根据索引关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })

    //通过代理的形式，为btn-edit绑定点击事件
    var indexEdit=null
    $('tbody').on('click','#btn-edit',function(e){
        //弹出一个修改文章分类信息的层
        indexEdit=layer.open({
            type:1,
            area:['500px','250px'],
            'title':'修改文章分类',
            'content':$('#dialog-edit').html()
        })
        var id=$(this).attr('data-id')
        console.log(id)
    })

    //通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click','#btn-delete',function(){
        var id=$(this).attr('data-id')
        //提示用户是否删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate',
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index);
                    initArtCateList()
                }
            })
          });
    })

})