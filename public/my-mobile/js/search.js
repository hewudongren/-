$(function () {
    //点击搜索按钮,获得数据保存到本地
    //移动端的tap事件,没有事件对象,
    //获取本地数据
    function getLocalData() {
        var history = window.localStorage.getItem("search_history")
        if (history == null) {
            history = []
            // history.unshift(searchVal)
        } else {
            history = JSON.parse(history)
            // history.unshift(searchVal)
        }
        return history
    }
    //当页面,打开,即执行渲染动作
   // getLocalData()
    $(".record ul").html(template("list", getLocalData()))



    $("form button").on("click", function (event) {

        //获得搜索框的值 需要除去空格
        var searchVal = $(this).prev().val().trim()
        if (searchVal == "") {
            //先阻止默认事件
            event.preventDefault();
            mui.alert("请输入搜索内容","温馨提示",)
            return
        } else {
            event.preventDefault();
            //就将原来保存的数据取出,转换成数组,并将新数据追加到里面,
            //再将数组转换成json格式的字符串,保存到本地 逆向思维,
            //获得本地数据
           var history=getLocalData()
              //如果搜索的数据在元数据中存在,就将老数据删除
              if(history.indexOf(searchVal)>=0){
                history.splice(history.indexOf(searchVal),1)
            }

            history.unshift(searchVal)
         
            //从本地存储取出数据渲染页面
            //如果传入的就是数组,循环数据时就直接是值
            $(".record ul").html(template("list", history))

            window.localStorage.setItem("search_history", JSON.stringify(history))


        }

    })
    //点击删除按钮,删除该条数据,即从本地保存数据删除给条数据,再重新渲染页面
        $("ul").on("click","i",function(){
            //获得对应的索引
            var index=$(this).parent().index()
            console.log(index);
            var history=getLocalData()
          //在本地数据中删除对应的数据  
          history.splice(index,1)
          //用数据渲染页面
          $(".record ul").html(template("list", history)) 
          //将新的数据存入本地
          window.localStorage.setItem("search_history", JSON.stringify(history))
     
        })

        //点击清空,删除全部历史记录
        $(".mui-pull-right").on("tap",function(){
           //删除所有本地数据,
           window.localStorage.removeItem("search_history")
           $(".record ul").html(template("list", getLocalData()))
        })




})