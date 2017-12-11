$(function () {
    //设置默认页码
    var currentPage = 1
    var pageSize = 5
    //默认渲染首页
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
        url: "/category/queryTopCategoryPaging",

        data: {
            page: 1,
            pageSize: 100
        },
        success: function (backData) {
            $(".dropdown-menu").empty()
            console.log(backData)
            $.each(backData.rows, function (i, n) {
                //将内容和id都保存到a标签上
                var li = $('<li><a href="javascript:;" data-id='+n.id+' >' + n.categoryName + '</a> </li>')
                $(".dropdown-menu").append(li)

            })
        }
    })
    //给下拉框列表注册委托事件
    $(".dropdown-menu").on("click","li",function(){
        
         $("#dropdownMenu1 .aa").html($(this).find("a").html()) 
        //    console.log($(this).find("a").data("id"));
       $("input[name=categoryId]").val($(this).find("a").data("id"))
       
           // 人为的更新状态 为成功 匹配状态显示图标
         $("form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })
    //文件上传,调用该对象的方法
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            $("form img").attr("src", data.result.picAddr)
            $("form .path").val(data.result.picAddr)
            $("form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });
    //表单提交之前先验证
    //使用表单校验插件
    $("form").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
      excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '分类名不能为空'
                    }
                  
                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '品牌名称不能为空'
                    }
                  
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '图片不能为空'
                    }
                  
                }
            },
        }

    }).on('success.form.bv', function (e) {
        e.preventDefault();
       console.log($("form").serialize());
        //使用ajax提交逻辑
        $.ajax({
            url:"/category/addSecondCategory",
            type:"post",
            data:$("form").serialize(),
            success:function(backData){
                    console.log(backData);
                    $("#myModal2").modal("hide")
                    // $("form").reset()
                    document.querySelector("form").reset()
                    getdata()
                    $("#form").data('bootstrapValidator').resetForm()
                    // window.location.reload()//会刷新整个页面
                    $("#dropdownMenu1 .aa").html("请输入") 
                    $("form img").attr("src", "./images/none.png")
            }
        })
    });






})