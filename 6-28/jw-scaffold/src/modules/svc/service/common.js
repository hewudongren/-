/**
 * 公共资源模块
 */

import publicWidget from './public'

export default {
  name: 'common',
  mixins: [ publicWidget ],

  methods: {

    getCategory() {

      return "common"
    }
  }
}