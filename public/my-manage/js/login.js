$(function () {

    //点击增加正则验证
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
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 12,
                        message: '用户名长度必须在6到30之间'
                    },
                    //验证不通过时的信息
                    callback: {
                        message: "用户名不存在"
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    },
                    //验证不通过时的信息
                    callback: {
                        message: "密码不正确"
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码由数字字母下划线和.组成'
                    }
                }
            },
        }
    }).on('success.form.bv', function (e) {
        //点击开启进度条
        NProgress.start()

        //表单验证成功,发送ajax请求去服务器验证


        e.preventDefault();
        //使用ajax提交逻辑 
        $.ajax({
            url: "/employee/employeeLogin",
            type: "post",
            data: $("form").serialize(),
            success: function (backData) {
                //验证成功,关闭进度条

                NProgress.done()


                console.log(backData)
                //根据返回结果,渲染页面
                //登录成功,回到首页  用户名和密码验证成功
                if (backData.success) {

                   window.location.href = "./index.html"

               


                } else {
                    //登录错误,分支判断 通过表单对象 所有和表单有关的可以调用表单对象
                    var validator = $("form").data('bootstrapValidator');
                    //用户名不存在
                    if (backData.error == 1000) {
                        validator.updateStatus('username', 'INVALID', 'callback');
                    } else if (backData.error == 1001) {
                        //密码错误
                        validator.updateStatus('password', 'INVALID', 'callback');
                    }
                }


            }
        })
    });
    //点击重置 ,恢复表单默认状态
    $("button[type=reset]").on("click", function () {
        var validator = $("form").data('bootstrapValidator');
        validator.resetForm()
    })












    //点击发送ajax验证请求
    // $("button[type=submit]").on("click", function (event) {
    //     event.preventDefault()
    //     console.log($("form").serialize())
    //     $.ajax({
    //         url: "/employee/employeeLogin",
    //         type: "post",
    //         data: $("form").serialize(),
    //         success: function (backData) {
    //             console.log(backData)
    //         }
    //     })
    // })








})