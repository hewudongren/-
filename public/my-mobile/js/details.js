$(function () {
    //根据上一页传入的参数,响应对应的数据
    //获取id
    var id = window.location.search.slice(1).split("=")[1]
    console.log(id);
    $.ajax({
        url: "/product/queryProductDetail",
        data: {
            id: id
        },
        success: function (backData) {
            console.log(backData);
            $(".mui-scroll").html(template("content", backData))
            // 因为自己动态添加了 轮播图 需要自己手动初始化
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
            mui(".mui-numbox").numbox()
            //动态生成尺码 转换成数组
            var num = backData.size.split("-")
            console.log(num);
            var startNum = num[0]
            var endNum = num[1]
            //循环生成尺码
            for (var i = startNum; i <= endNum; i++) {
                $("<span>" + i + "</span>").appendTo($(".size")).on("click", function () {
                    $(this).addClass("active").siblings().removeClass("active")
                })

            }


        }
    })
    //点击加入购物车,将所选商品加入,要先判断用户是否输入
    $(".add-cart").on("click", function () {
        var myNum = $("input[type=number]").val()
        var mySize = $(".size span.active").html()
        if(myNum<=0||mySize==""){
            mui.toast("请选择购买数量和尺码")
            return
        }
        //该接口判断用户是否登录
        $.ajax({
            url: "/cart/addCart",
            type: "post",
            data: {
                productId: id,
                num: myNum,
                size: mySize
            },
            success: function (backData) {
                console.log(backData)
                if (backData.error == 400) {
                    mui.confirm("你还没有登录", "友情提示", ["取消", "登录"], function (e) {
                        console.log(e);
                        //如果点击登录.去到登录页面,点击取消,还是当前页
                        if (e.index == 1) {
                            window.location.href = "./login.html"
                        }
                    })
                }else{
                    mui.toast("已加入购物车")
                    //数据存入数据库,在购物车页面渲染出来,即可
                }
            }

        })
    })







})