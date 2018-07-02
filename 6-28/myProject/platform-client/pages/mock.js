import Mock from 'mockjs';

//模拟数据

//订单管理列表
const orderListdata = Mock.mock('http://123.com/a',{
    'orderList|28': [{
        "img": "@image('60x60',#b7ef7c)",
        "classify|10-20":1,
        "sort":"1",
        "gender":"男" ,
        "name":"@csentence(5,6)",
        "SPU|6-10":1 ,
        "status":"",  //定义每一条的状态
        "visible":["私有","组内可见","全部可见","重复"]
       }],

});

// 待审订单列表
const reviewListdata = Mock.mock('http://123.com/b',{
    'reviewList|28': [{
        'ordernumber|0-9': 1,
         "orderTime":"@time",
        // "site|0-9":1 ,
        "img": [{
                  "icon":"@image('60x60',#b7ef7c)",
                  "size":"s",
                  "num|0-9":1  
                },
                {
                    "icon":"@image('60x60',#b7ef7c)",
                    "size":"s",
                    "num|0-9":1  
                  }
                ],
        "title":"@ctitle(2,5)",
        "SKU":1 ,
        "GIFT":"没有" ,
        "price|0-1000":1,
        "halfprice|0-1000":1 ,
        "freebie":1,
        // "num|0-9":1,
        // "name":"@ctitle(2,5)",
        // "phone":1,
        "area":"@csentence(1,5)",
        "notes":"",
       }],

});
//SKU设置数据
const branddata = Mock.mock('http://123.com/c',{
    'brandList|23': [{
        "img": "@image('60x60',#b7ef7c)",
        "color":"黑色",
        "size":"s",
        "SKU":"123456",
        "state":"待确认",
        "group":{
            "SKU":"123456",
            "count":"8"
        },
       }],

});
//站点列表
const sitedata = Mock.mock('http://123.com/d',{
    'siteList|28': [{
        "img": "@image('60x60',#b7ef7c)",
        "classify|1":["一级分类","二级分类","三级分类"],
        "state|1":["上架","下架"],
        "putIn":{
            "link":"123456789",
            "num":"1"
        }, 
        "SPU":"123456",
        "inventory|10-100":1,
        "sales|0-10":1,
        "title":"123" ,
        "area":"中国",
        "price|0-10":1,
        "developer":"小米" ,
        "group":"一部",
         "time":"@time",
        "PV|100-1000":1,
        "dsp":"80%",
        "bb":false
       
        

       }],

});

 
export default {
    reviewListdata,
    sitedata,
    orderListdata,
    branddata,
   
}