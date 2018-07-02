export default {
  docUrl: 'http://doc.jwis.cn/docs/index.html', 
  headerTitle: 'Cloud Platform',
  footerTxt: 'JWI Innovation Software(Shenzhen)Ltd.',

  //多语言配置
  languageMap: {
    'platform.app_app.permission': '',
    'platform.app_pm.treeTitle': '',
    'platform.app_pm.actionTitle': '',
    'platform.app_pm.apiTitle': '',
    'platform.common.creatorDate': '',
    'platform.app_role.role': '',
    'platform.app_role.addRole': '',
    'platform.app_profile.rights_profile':'',
    'platform.app_role.editRole': '',
    'platform.app_app.editApp': ''
  },

  //系统左侧导航栏配置
  asideMenu: [{
      path: '/bresources',
      code: 'bresources',
      name: '',
      nameKey: 'platform.menu.bresources',
      icon: 'icon-cloud',
      children: [{
        path: '/bresources/bresources/index',
        name: '',
        nameKey: 'platform.menu.bresources/bresources',
        code: 'bresources/bresources',
        icon: 'icon-star'
      },
      {
        path: '/bresources/resource',
        name: '',
        nameKey: 'platform.menu.bresources/presource',
        code: 'bresources/resource',
        icon: 'icon-star'
      },
      {
        path: '/bresources/parameter',
        name: '',
        nameKey: 'platform.menu.bresources/pparameter',
        code: 'bresources/parameter',
        icon: 'icon-star'
      },
      {
        path: '/bresources/information',
        name: '',
        nameKey: 'platform.menu.bresources/information',
        code: 'bresources/information',
        icon: 'icon-star'
      },
      {
        path: '/bresources/picture',
        name: '',
        nameKey: 'platform.menu.bresources/picture',
        code: 'bresources/picture',
        icon: 'icon-star'
      },
      {
        path: '/bresources/process',
        name: '',
        nameKey: 'platform.menu.bresources/process',
        code: 'bresources/process',
        icon: 'icon-star'
      },
      {
        path: '/bresources/describe',
        name: '',
        nameKey: 'platform.menu.bresources/describe',
        code: 'bresources/describe',
        icon: 'icon-star'
      },
      {
        path: '/bresources/deploy',
        name: '',
        nameKey: 'platform.menu.bresources/deploy',
        code: 'bresources/deploy',
        icon: 'icon-star'
      },
      {
        path: '/bresources/documents',
        name: '',
        nameKey: 'platform.menu.bresources/documents',
        code: 'bresources/documents',
        icon: 'icon-star'
      }
    ]
    },
    {
      path: '/digital',
      name: '',
      nameKey: 'platform.menu.digital',
      code: 'digital',
      icon: 'icon-digital',
      children: [{
          path: '/digital/pdm/index',
          name: '',
          nameKey: 'platform.menu.digital/pdm',
          code: 'digital/pdm',
          icon: 'icon-pdm'
        },{
          path: '/digital/mpm/index',
          name: '',
          nameKey: 'platform.menu.digital/mpm',
          code: 'digital/mpm',
          icon: 'icon-mpm'
        },{
          path: '/digital/iot/index',
          name: '',
          nameKey: 'platform.menu.digital/iot',
          code: 'digital/iot',
          icon: 'icon-operation'
        }
      ]
    },
    {
      path: '/forms',
      name: '',
      nameKey: 'platform.menu.forms',
      code: 'digital',
      icon: 'icon-digital',
      children: [{
          path: '/forms/pdm/index',
          name: 'aa',
          nameKey: 'platform.menu.forms/a',
          code: 'digital/pdm',
          icon: 'icon-pdm'
        },{
          path: '/forms/mpm/index',
          name: 'bb',
          nameKey: 'platform.menu.forms/b',
          code: 'digital/mpm',
          icon: 'icon-mpm'
        },{
          path: '/forms/iot/index',
          name: 'cc',
          nameKey: 'platform.menu.forms/c',
          code: 'digital/iot',
          icon: 'icon-operation'
        }
       
      ]
    },
    
    // {
    //   path: '/middleware',
    //   name: '',
    //   nameKey: 'platform.menu.middleware',
    //   code: 'middleware',
    //   icon: 'icon-midware'
    // },
    // {
    //   path: '/config',
    //   name: '',
    //   nameKey: 'platform.menu.config',
    //   code: 'config',
    //   icon: 'icon-config-rule',
    //   children: [{
    //       path: '/config/i18n',
    //       name: '',
    //       nameKey: 'platform.menu.config/i18n',
    //       code: 'config/i18n',
    //       icon: 'icon-internal'
    //     },{
    //       path: '/config/dataDictionary',
    //       code: 'config/dataDictionary',
    //       name: '',
    //       nameKey: 'platform.menu.config/dataDictionary',
    //       icon: 'icon-data-dict'
    //     }
    //   ]
    // },
    // {
    //   path: '/sys',
    //   name: '',
    //   nameKey: 'platform.menu.sys',
    //   code: 'sys',
    //   icon: 'icon-user-setting',
    //   children: [{
    //       path: '/sys/user/index',
    //       name: '',
    //       nameKey: 'platform.menu.sys/user',
    //       code: 'sys/user',
    //       icon: 'icon-user'
    //     },{
    //       path: '/sys/org/index',
    //       name: '',
    //       nameKey: 'platform.menu.sys/org',
    //       code: 'sys/org',
    //       icon: 'icon-institute'
    //     }
    //   ]
    // },
    // {
    //   path: '/apm',
    //   name: '',
    //   nameKey: 'platform.menu.apm',
    //   code: 'apm',
    //   icon: 'icon-jiankong'
    // },
    // {
    //   path: '/analysis',
    //   name: '',
    //   nameKey: 'platform.menu.analysis',
    //   code: 'analysis',
    //   icon: 'icon-bar',
    //   children: [{
    //       path: '/analysis/traffic',
    //       name: '',
    //       nameKey: 'platform.menu.analysis/traffic',
    //       code: 'analysis/traffic',
    //       icon: 'icon-chart'
    //     },{
    //       path: '/analysis/performance',
    //       name: '',
    //       nameKey: 'platform.menu.analysis/performance',
    //       code: 'analysis/performance',
    //       icon: 'iconfont icon-xingneng'
    //     },{
    //       path: '/analysis/error',
    //       name: '',
    //       nameKey: 'platform.menu.analysis/error',
    //       code: 'analysis/error',
    //       icon: 'iconfont icon-error'
    //     },{
    //       path: '/analysis/device',
    //       name: '',
    //       nameKey: 'platform.menu.analysis/device',
    //       code: 'analysis/device',
    //       icon: 'iconfont icon-shebei'
    //     }
    //   ]
    // }
  ]
}