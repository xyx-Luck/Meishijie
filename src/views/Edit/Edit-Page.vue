<template>
  <div class="edit">
    <TopHeader />
    <div class="editInfo">
      <el-form ref="form" label-width="80px">
        <ImgUpload action='/api/upload?type=user' src='avatar'/>
        <el-form-item label="修改名称">
          <el-input v-model='name'></el-input>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model='sign'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveUserInfo">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader/TopHeader.vue'
import ImgUpload from '@/components/Img-Upload/Img-Upload.vue'
import {reqEditUserInfo} from '@/api/ajax.js'
export default {
  components: {
    TopHeader,
    ImgUpload
  },
  data(){
      //获取登录用户的信息
       const loginInfo=this.$store.state.userInfo;
      return{
         avatar:loginInfo.avatar,
         name:loginInfo.name,
         sign:loginInfo.sign
      }
  },
  methods:{
      async saveUserInfo(){
          //ajax
          const res=await reqEditUserInfo({avatar:this.avatar,name:this.name,sign:this.sign})
          console.log(res)
          if(res.code===0){
              this.$message({
                message: res.mes,
                type: 'success'
                });
          }
          //跳转到个人中心
          this.$router.replace('/space')
      }
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.editInfo {
  width: 60%;
  background: #fff;
  padding: 20px;
  margin: 0 auto;
}
</style>