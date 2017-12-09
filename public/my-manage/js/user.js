$(function () {
    //ajax请求数据,渲染页面
    //设置默认的页码
    var currentPage = 1
    var pageSize = 5
    //封装ajax,以便复用 在外面默认调用一次.显示默认状态
    function getdata() {
        $.ajax({
            url: "/user/queryUser",
            data: {
                page: currentPage,      //会根据不同页码动态渲染数据
                pageSize: pageSize
            },
            success: function (backData) {
                console.log(backData)
                $("tbody").html(template("user", backData))
                //使用分页

                $("#pagintor").bootstrapPaginator({

                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage, //当前页
                    totalPages: Math.ceil(backData.total / backData.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                       
                      
                      
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page
                        //每点击一次重新请求新的数据 在自己里面调自己,但不是递归,这里需要通过事件触发
                        getdata()
                    },
                    itemTexts: function (type, page, current) {
                        
                                        switch (type) {
                        
                                            case "first":
                        
                                                return "首页";
                        
                                            case "prev":
                        
                                                return "上一页";
                        
                                            case "next":
                        
                                                return "下一页";
                        
                                            case "last":
                        
                                                return "末页";
                        
                                            case "page":
                        
                                                return page;
                        
                                        }
                        
                                    }

                  
                });
               
              
            }
        })
    }
    //点击操作键,更改状态 获得当前的状态,去修改对应的值,
    $("tbody").on("click","button" ,function(){
        var id=$(this).parent().data("id")
        //使用变量时,尽量声明变量
        var isDelete
        if($(this).html()=="启用"){
            isDelete=0
        }else{
            isDelete=1
        }
      $.ajax({
          url:"/user/updateUser",
          data:{
              id:id,
              isDelete:isDelete
          },
          type:"post",
          success:function(backData){
              //修改成功后,重新刷新数据
            console.log(backData)
            getdata()
          }
      })
    })
    getdata()
  

   



})