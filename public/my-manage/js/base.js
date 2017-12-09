$(function () {
    //检验登录状态
    //在当前页,检核登录状态
    $.ajax({
        url: "/employee/checkRootLogin",
        success: function (backData) {
            console.log(backData)
            if (backData.error == 400) {
                window.location.href = "./login.html"
            }
        }
    })

    //点击满屏
    //有样式改变,最好使用类名
    $(".full").on("click", function () {
        //点击时,让侧边栏切换显示隐藏效果
        $("#aside").toggle()
        //让主体内容满屏切换 与侧边栏配合使用
        $("#main").toggleClass("full")
    })
    //点击退出返回登录页
    $(".sure").on("click", function () {
        //弹出模态框

        //发送ajax请求取消登录状态码
        $.ajax({
            url: "/employee/employeeLogout",
            //   type:"get",
            success: function (backData) {
                console.log(backData)
                window.location.href = "./login.html"

            }
        })
    })

    //点击分类,切换下拉菜单
    $(".manage ul li:eq(1)>a").on("click",function(){
        $(this).next().slideToggle()
    })








})