$(function(){
    //页面打开默认渲染左边列表
    $.ajax({
        url:"/category/queryTopCategory",
        success:function(backData){
            // console.log(backData)
            $(".tap-left ul").html(template("left",backData))
            //默认显示第一个数据,在数据渲染出来后,自动执行点击事件
            $(".tap-left li").first().children("a").click()
        }
    })
    //给每一li下的a标签添加点击事件 直接绑定方便获取数据
    $(".tap-left ul").on("click","a",function(){
        $(this).parent().addClass("active").siblings().removeClass("active")
        //根据对应的id请求对应的数据
        var id=$(this).data("id")
        $.ajax({
            url:"/category/querySecondCategory",
            data:{
                id:id,
            },
            success:function(backData){
                console.log(backData)
                $(".cont-right ul").html(template("right",backData))
            }
        })
    })








})