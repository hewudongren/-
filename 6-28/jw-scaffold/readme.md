平台脚手架
================

``` dir
 work
  |
  |----- jw-scaffold (脚手架)
  |
  |----- myProject (项目开发)
  |          |--- common (公共)
  |          |--- models (请求)
  |          |--- modules (页面逻辑)
  |          |--- stores (存储器)
  |          |
  |          |
  |          |--- package-config.js (打包配置和项目中接口配置，必须要有)
  |          |--- router.js (项目路由配置，必须要有)
  |          |--- scafford-config.js (脚手架配置，必须要有)


# 客户端配置文件： work/myProject/package-config格式如下：
    export default {
        
        package: {}                 //webapck打包配置
        metaConf: {}                //业务系统中需要用到的接口URL
        title: ''                   //页面<title>{title}</title>    
        port: 80                    //调试端口
        domain: 'test.jwis.cn'      //调试地址
    }

# 客户端配置文件： work/myProject/scaffold-config格式如下：
    export default {
        docUrl:''                   //文档导航地址，如果不需要传空即可
        headerTitle: ''             //设置Header中企业名称
        footerTxt: ''               //配置页面底部企业备注
        languageMap: {}             //配置业务系统中多语言
        asideMenuQueue:[]           //配置左侧导航栏显示顺序
        excludeRouters:[]           //配置需要移除的路由
        asideMenu:[]                //配置业务系统左侧导航
    }

    详细注释请看：jw-scaffold/jw.config.js

# 客户端配置文件： work/myProject/router 配置业务系统路由

生产打包 work/jw-scaffold 目录运行: npm run build target=myProject
开发调试 work/jw-scaffold 目录运行: npm run start target=myProject
首次打包时，需要安装node_modules,于目录 work/jw-scaffold 下运行命令：npm install

生产打包代码生成目录：work/jw-scaffold/dist
```