$(function(){
    //点击登录按钮,ajax请求登录
    $(".submit").on("click",function(event){
        //先阻止默认事件
        event.preventDefault();
        console.log($("form").serialize());
        $.ajax({
            url:"/user/login",
            type:"post",
            data:$("form").serialize(),
            success:function(backData){
                console.log(backData)
                if(backData.success){
                        window.history.back()
                }else{
                    mui.toast("用户名名或密码错误")
                }

            }
        })
    })
})