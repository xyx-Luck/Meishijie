<template>
  <div>
    <TopHeader />
    <!-- 登录框 -->
    <div class="login">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login"></el-tab-pane>
        <el-tab-pane label="注册" name="regist"></el-tab-pane>
      </el-tabs>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader/TopHeader.vue'
import { reqLogin, reqRegist } from "@/api/ajax.js"
export default {
  components: {
    TopHeader
  },
  data () {
    return {
      activeName: 'login',
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度至少1个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 0, max: 8, message: '密码至少为一个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClick (tab) {
      this.activeName = tab.name
    },
    onSubmit () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          //通过this.activeName的值判断是注册还是登录
          if (this.activeName === 'login') {//登录
            //ajax请求
            const res = await reqLogin(this.ruleForm);
            if (res.code === 0) {
              //登录成功
              //1.把后台给的token存储到本地
              localStorage.setItem('token', res.data.token)
              //2.跳转到首页 
              this.$router.push({ path: '/home' })
            }
            if (res.code === 1) {
              this.$message.error(res.mes);
            }

          } else if (this.activeName === 'regist') {//注册
            const res = await reqRegist({
              name: this.ruleForm.name,
              password: this.ruleForm.password,

            });
            if (res.code === 0) {
              this.$message({
                message: '恭喜你，注册成功，可以去登录了',
                type: 'success'
              });
            }
          }

        }
      })
    }
  }
}
</script>
<style lang='less'>
* {
  margin: 0;
  padding: 0;
}
.login {
  width: 500px;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 10px 10px 10px #d6d3d3;
}
.el-form {
  padding-right: 70px;
  padding-bottom: 30px;
}
</style>