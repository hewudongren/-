 <template>
    <!-- 产品采购信息 -->
     <div class="Procurement">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="供应商" prop="supplier">
                <el-select v-model="ruleForm.supplie" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商产品编号" prop="number">
                <el-input v-model="ruleForm.number"></el-input>
            </el-form-item>
          
            <el-form-item label="最小起订量" prop="mincount">
                <el-input v-model="ruleForm.mincount"></el-input>
            </el-form-item>
            <el-form-item label="采购价" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
             <el-form-item label="采购链接" prop="link">
                <el-input v-model="ruleForm.link"></el-input>
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
          supplier: '',
          number: '',
          mincount: '',
          price: '',
          link: "",
          
        },
        rules: {
          supplier: [
            { required: true, message: '请输入活动名称', trigger: 'change' },
           
          ],
          number: [
            { required: true, message: '请选择活动区域', trigger: 'blur' }
          ],
          mincount: [
            {  required: true, message: '请选择日期', trigger: 'blur' }
          ],
          price: [
            {  required: true, message: '请选择时间', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '请至少选择一个活动性质', trigger: 'blur' }
          ],
        
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
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