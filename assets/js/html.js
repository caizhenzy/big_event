$(function(){
    // 切换登录和注册界面
    $('#link-reg').on('click',()=>{
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()  
    })
// 表单验证
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repwd : function(value){
         var pwd = $('.reg-box [name=password]').val()
         if(pwd !== value) return '前后密码不一致'
        }
    })
// 提交注册事件
    var layer = layui.layer
    $('#form-reg').on('submit',function(e){
        e.preventDefault()
        $.post('/api/reguser',{
            username: $('.reg-box [name=username]').val() , password: $('.reg-box [name=password]').val()
        },function(res){
            if(res.status !== 0) return console.log(layer.msg(res.message))
            layer.msg('注册成功, 请登录');
            $('#link-login').click()
        })
    })
    // 登录
    $('#form-login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href = './index.html'
            }
        })
    })
})