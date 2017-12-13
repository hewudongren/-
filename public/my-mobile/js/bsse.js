//区域滚动
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false, //是否显示滚动条
});
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});
//点击放回箭头,放回上一页
$(".back").on("click",function(){
      window.history.back()
})
//点击搜索按钮,放回搜索中心
$(".search ").on("tap",function(){
  window.location.href="./search.html"
})
//点击退出,回到登录页面
$(".quit").on("tap",function(){
  window.location.href="./login.html"
})


