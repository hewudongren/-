<script>
import { Switch } from "element-ui";
import util from "jw_common/util";


export default {
  mixins: [Switch],

  updated() {

    if (util.isIE9()) {
      let switchBtn = this.$el.getElementsByClassName("el-switch__button");

      if (switchBtn && switchBtn[0]) {
        if (this.checked) {
          switchBtn[0].style.left = "21px";
        } else {
          switchBtn[0].style.left = "";
        }
      }
    }
  }
};
</script>
<style lang="less">
.el-switch__core {
  
}
</style>
