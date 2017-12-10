$(function () {
    //打开页面,默认ajax请求数据 直接将数据库数据,全部请求,渲染页面
    //默认页码 一般来讲,请求数据都会做分页处理,请求参数为页面和页容量
    var currentPage = 1
    var pageSize = 5

    function getdata() {
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (backData) {
                console.log(backData)
                $("tbody").html(template("first", backData))
                //分页功能
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

    //变更数据,添加,修改,删除,查询(默认状态为整体查询),就是在浏览器将数据变更了,发送数据库,保存变更数据,再重新渲染页面
    //点击添加按钮,保存数据,再刷新数据
  
        //正则验证 //点击增加正则验证
    $("form").bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },



        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                
                }
            }
           
        }
    }).on('success.form.bv', function (e) {
      

        //表单验证成功,发送ajax请求去服务器验证
       

        e.preventDefault();
        //使用ajax提交逻辑 
        $.ajax({
            url: "/category/addTopCategory",
            type: "post",
            data: $("form").serialize(),  //表单格式化数据      
            success: function (backData) {
                // console.log(backData)
                $('#myModal2').modal('hide')
                //数据库返回数据,再次刷新页面
                getdata()
          
                var validator = $("form").data('bootstrapValidator');
                validator.resetForm()
                // $("form").reset()
                document.querySelector("form").reset()
                // //触发 reset 事件
                // $("input[type=reset]").trigger("click");
            


            }
        })
    });








    })













