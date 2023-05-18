$(function(){
    getUserInfo()

    var layer = layui.layer

    $('#btnLogOut').on('click',function(){
        layer.confirm('是否确认退出', {icon: 3}, function(index){
            localStorage.removeItem('token')
            location.href = './login.html'
            layer.close(index)
          });

    })
})

function getUserInfo(){
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // 身份认证
        // headers:{
        //     Authorization : localStorage.getItem('token') || ''
        // },
        success: function(res){
            if(res.status !== 0){return layui.layer.msg('获取失败')}
            console.log(res.data);
            renderAvater(res.data)
        },
        // complete: function(res){
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        //         localStorage.removeItem('token')
        //         location.href = './login.html'
        //     }
        // } 
    })
}
function renderAvater(user){
    var name = user.nickname || user.username
    // $('#index-name')[0].lastChild.data = name
    $('#index-name').text(name) 
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src','user.user_pic')
    }else{
        $('.layui-nav-img').attr('src','https://unpkg.com/outeres@0.0.10/img/layui/icon-v2.png').show()
    }
}