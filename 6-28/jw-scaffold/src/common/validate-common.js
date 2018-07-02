/**
 * 公共验证方法
 */

 export default {

  isEmail(email) {

    return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email)
  },

  isPhone(phone) {

    return /^[0-9]+[-]*$/.test(phone)
  }
 }