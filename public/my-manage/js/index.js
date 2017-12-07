$(function(){
    //注册人数柱状图
       // 基于准备好的dom，初始化echarts实例
       var myChart = echarts.init(document.getElementById('main1'));
       
               // 指定图表的配置项和数据
               var option = {
                   title: {
                       text: '2017注册人数',
                       left:"20",
                       textStyle:{
                           color:"red"
                       }
                   },
                   tooltip: {},
                   legend: {
                       data:['人数']
                       
                   },
                   xAxis: {
                       data: ["1月","二月","三月","四月","五月","六月","七月","八月","九月","十月"]
                   },
                   yAxis: {},
                   series: [{
                       name: '人数',
                       type: 'bar',
                       data: [5000, 3500, 3000, 4000, 6000,9000,11000,4000,3000,2000]
                   }]
               };
       
               // 使用刚指定的配置项和数据显示图表。
               myChart.setOption(option);

        //销量饼图
 // 基于准备好的dom，初始化echarts实例
 var myChart2 = echarts.init(document.getElementById('main2'));


        option2 = {
            title : {
                
                text: '黑马前端与移动开发就业统计图',
                subtext: '深圳校区',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['13期','12期','11期','10期','9期']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:61, name:'13期'},
                        {value:50, name:'12期'},
                        {value:55, name:'11期'},
                        {value:45, name:'10期'},
                        {value:52, name:'9期'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
               
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);
    


















})