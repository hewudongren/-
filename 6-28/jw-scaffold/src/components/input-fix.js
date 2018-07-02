/**
 *支持 ie9 
 */

import { Input } from 'element-ui'
import util from 'jw_common/util'

export default {
  mixins: [ Input ],

  mounted() {

    this.ie9InputFix();
  },

  methods: {

    ie9InputFix() {
      const DELETE_CODE = 46
      const BACKSPACE_CODE = 8
      let inputDom = this.$refs.input

      if(util.isIE9() && inputDom && inputDom.addEventListener) {

        inputDom.addEventListener('keyup',(event)=>{
          if(event.keyCode === DELETE_CODE || event.keyCode === BACKSPACE_CODE) {

            this.handleInput(event)
          }
        })
      }
    }
  }
}