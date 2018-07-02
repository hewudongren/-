<template>
    <div class="imageUpload">
         <el-upload
                  class="avatar-uploader"
                  action="http://img.orkotech.com/fdfs_upload.php"
                  :data="uploadParams"
                  :show-file-list="false"
                  
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="img" :src="img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>
<style lang="less">
    .imageUpload{

    }
</style>

<script>
    import md5 from 'js-md5';
    export default{
        
        data(){
            return {
                img:"",             //图片预览路径    
                uploadParams:{      //上传参数
                file_field:"fdfs_file",
                token:"",
                time:+new Date(),
                format:"png",
                fdfs_file:""
                },
            }
        },
        props:["path"],
        methods:{
            //图片上传
            beforeAvatarUpload(file) {
                
                this.uploadParams.fdfs_file=file
                //MD5加密
                this.uploadParams.token = md5.hex('salt001'+this.uploadParams.time);
                this.uploadParams.format=file.type.replace(/image\//g,"")

                const isJPG = file.type === 'image/jpeg'||'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                
                if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            //上传成功
            handleAvatarSuccess(res, file) {
           
                this.img=file.url
                if(res.status==0){
                this.$store.commit("setimgPath",res.path)
                }else{
                this.$message.error(res.msg);
                }
            },
        },
        computed:{
          
        },
        watch:{

        },
        created(){
            
           
           
            
        }

    }
</script>
