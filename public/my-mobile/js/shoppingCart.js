$(function () {
    //进入购物车页面,默认查询数据库,渲染页面
    function getData(){
        $.ajax({
            url: '/cart/queryCartPaging',
            data: {
                page: 1,
                pageSize: 999
            },
            success: function (backData) {
                console.log(backData);
                $("#OA_task_1").html(template("list", backData))
            }
        })
    }
    
    // getData()




    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                auto: true, //可选,默认false.首次加载自动上拉刷新一次
                callback: function () {
                    // console.log('哈哈哈');
                    // mui('.lt_content').pullRefresh().endPulldown();
                    // ajax获取 购物车数据
                  setTimeout(function(){
                      getData()
                      mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                  },1000)

                   

                } //pullfresh-function //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });








    

    //点击删除按钮,删除对应的数据    有问题,删不掉数据
    $("#OA_task_1").on("tap",".fa-trash",function(){
        var id=$(this).attr('data-id')
        console.log(id);
        $.ajax({
            url:"/cart/deleteCart",
            data:{
                id:[id]
            },
            success:function(backData){
                    console.log(backData)
                      // 如果成功了
                if (backData.success) {
                    // 人为刷新一下
                   mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                    getData()



                }
            }
        })
    })

   //点击选择按钮,将对应的价格汇总
   var total=+$(".total span").html()
    $("#OA_task_1").on("click","input[type=checkbox]",function(){

    
       //js计算浮点数不精确,可以先乘以10.最后再除以10
       var price= $(this).parent().next().find("i").html()*10
      var num=parseInt($(this).parent().next().find(".num").html())
      if($(this).prop("checked")){
        total+=price*num
      }else{
        total-=price*num  
      }
      
   
      console.log(total);
      
      $(".total span").html(total/10||"0.00")//很好用
      //
      


    })

    $(".total span").html(total/10||"0.00")//很好用
    //






})