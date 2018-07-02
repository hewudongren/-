
//公共变量
const gateway = 'http://gateway.jwis.cn'
const login = 'http://login.jwis.cn'
const appkey = '1ef836f98c' //'a203980c6e'
let path = require('path')
//私有配置
module.exports = {
  //输出别名
  package: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        pages: 'platform-client/pages',
        components: 'platform-client/pages/components',
        assets: 'platform-client/assets',
         models: 'platform-client/models',
       
        stores: 'platform-client/stores',
        common: 'platform-client/common',
        modules: 'platform-client/modules',
        components: 'platform-client/components'
      }
    }
  },
  // 请求接口
  metaConf: {
   login,
    appkey,
     gateway,
  
    i18n: `${gateway}/i18n`,
    dict: `${gateway}/dict`,
    account: `${gateway}/account`
  },

  title: 'JWI Cloud Platform',
  port: 80,
  domain: 'test.jwis.cn'
}