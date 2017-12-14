$(function(){
    //通过上一页面对应的值,请求数据,渲染页面
    //得到总个地址栏
    //var val=window.location.href
    //得到搜索值
    var val=window.location.search.slice(1)
console.log(val)
var val=val.split("=")[1]
val=decodeURI(val) 
//将该值赋值给搜索框
$("input[type=search]").val(val)
//有多个参数,可以用对象动态传入
function getData (options){
    $.ajax({
        url:"/product/queryProduct",
        data:{
             proName:options.proName,
             price:options.price||2,
             num:options.num||1,
            page:1,
            pageSize:999,
        },
        success:function(backData){
            console.log(backData)
            $(".shoplist ul").html(template("list",backData))
        }

    })
}
getData({
    proName:val
})

//在当前页搜索对应的数据
$("form button").on("click",function(){
    //先阻止默认事件
    event.preventDefault();
    //将val变为全局变量,可以全局统一
     val=$(this).prev().val().trim()
    // console.log(val);
    getData({
        proName:val
    })

})
//当点击详情按钮时,响应对应的数据
$(".details a").on("tap",function(){
    $(this).parent().toggleClass("active").find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down")
    getData({
        proName:val,
        price:$(this).find("i").hasClass("fa-angle-down")?2:1,
        // num:$(this).find("i").hasClass("fa-angle-down")?2:1,
    })
})
//点击立即购买.进入详情页
$(".shoplist").on("click","button",function(){
    console.log(111);
    var id=$(this).data("id")
    window.location.href="./details.html?id="+id
})




  










})