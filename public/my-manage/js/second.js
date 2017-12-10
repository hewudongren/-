$(function () {
    //设置默认页码
    var currentPage = 1
    var pageSize = 5

    function getdata() {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (backData) {
                // console.log(backData)
                $("tbody").html(template("second", backData))

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
    getdata()
    //渲染下拉框的数据
    $.ajax({
        url:"/category/queryTopCategoryPaging",
       
        data:{
            page:1,
            pageSize:100
        },
        success:function(backData){
            console.log(backData)
            $.each(backData.rows,function(i,n){
                    var li=$('<li><a href="javascript=:;"></a> </li>')
                    
            }) 
        }
    })




})