 <template>
    <!-- 添加供应商 -->
     <div class="AddSupplier">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
             <el-form-item label="供应商名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="area">
                <el-input v-model="ruleForm.area"></el-input>
            </el-form-item>
            <el-form-item label="平台" prop="platform">
                <el-select v-model="ruleForm.platform" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="采购价" prop="purchase_price">
                <el-input v-model="ruleForm.purchase_price"></el-input>
            </el-form-item>
            <el-form-item label="最少量" prop="minimum_qty">
                <el-input v-model="ruleForm.minimum_qty"></el-input>
            </el-form-item>
          
            <el-form-item label="联系人" prop="link_name">
                <el-input v-model="ruleForm.link_name"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="link_phone">
                <el-input v-model="ruleForm.link_phone"></el-input>
            </el-form-item>
            <el-form-item label="邮编" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
         
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
 </template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          area: '',
          platform: '',
          purchase_price: '',
          minimum_qty: '',
          link_name: '',
          link_phone: '',
          email: "",
         
        },
        rules: {
          name: [
            { required: true, message: '请输入供应商名称', trigger: 'blur' },
            
          ],
          platform: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          link_name: [
            {  required: true, message: '请选择日期', trigger: 'change' }
          ],
          link_phone: [
            {  required: true, message: '请选择时间', trigger: 'change' }
          ],
          email: [
            {  required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
         
        }
      };
    },
    methods: {
      submitForm(formName) {
        let that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/product/suppliers",this.ruleForm).then(res=>{
                   this.$message({
                     message:"提交成功",
                     type: 'success',
                     duration:1000,
                     onClose:function(){
                        that.$router.go(-1)
                     }
                   });
                   
            })
          } else {
            
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>