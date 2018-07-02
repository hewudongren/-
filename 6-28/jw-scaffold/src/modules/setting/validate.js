export default {

  name: {
    formList: [{        
      type: "text",
      label: "昵称",
      key: "name"
    }],
  
    rules: {
      name: [{
        required: true,
        message: "请输入名称",
        trigger: "blur"
      }, {
        min: 2,
        max: 20,
        message: "长度在 2 到 20 个字符",
        trigger: "blur"
      }]
    }
  },

  password: {
    formList: [{
        type: "password",
        label: "旧密码",
        key: "passwordOld"
      },
      {
        type: "password",
        label: "新密码",
        key: "password"
      },
      {
        type: "password",
        label: "确认密码",
        key: "checkPass"
      }
    ],

    rules: {

      passwordOld: [{
          required: true,
          message: "请输入旧密码",
          trigger: "blur"
        },
        {
          min: 3,
          max: 20,
          message: "长度在 3 到 20 个字符",
          trigger: "blur"
        }
      ]
    }
  },

  mobile: {
    formList: [{
      type: "text",
      label: "手机号码",
      key: "mobile"
    }],

    rules: {
      mobile: [{
          required: true,
          message: "请输入手机",
          trigger: "blur"
        },
        {
          min: 11,
          max: 11,
          message: "请输入正确的手机号码",
          trigger: "blur"
        }
      ]
    }
  },

  email: {
    formList: [{
      type: "text",
      label: "邮箱",
      key: "email"
    }],

    rules: {
      email: [{
        type: "email",
        required: true,
        message: "请输入邮箱",
        trigger: "blur"
      }]
    }
  }
}
