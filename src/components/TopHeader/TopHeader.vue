<template>
  <div class="header">
    <div class="headtop">
      <div>
        
            <img src="https://s1.c.meishij.net/n/images/logo2.png" style="height: 100%"/>
        <p class="avarev" v-if="userInfo.hasOwnProperty('name')">
          <img :src="userInfo.avatar" alt="" @click="$router.replace('/space')"/>
          <span>{{ userInfo.name }}</span>
          <span class="dish" @click="$router.replace('/Create')">发布菜谱</span>
          <span @click="logoOut">退出</span>
        </p>
        <p v-else>
          <span @click="$router.replace('/login')">登录</span>
          <span @click="$router.replace('/login')">注册 </span>
        </p>
      </div>
    </div>
    <div class="headnav">
      <div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="home" @click="$router.replace('/')">首页</el-menu-item>
          <el-menu-item index="menu" @click="$router.replace('/menu')">菜谱大全</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { reqLogOut } from '@/api/ajax.js'
export default {
  data () {
    return {
      activeIndex: "home"
    }
  },
  computed: {
    ...mapState(['userInfo']) //获取vuex中的用户信息
  },
  methods: {
    handleSelect () {
    
    },
    logoOut () {
      this.$confirm('确定退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        //ajax请求
        const res = await reqLogOut()
        if (res.code == 0) {
          //清除token
          localStorage.removeItem('token')
          //跳转到首页
          this.$router.replace('/')
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.headtop {
  height: 130px;
  line-height: 130px;
  background: #c90000;
}
.headtop > div {
  display: flex;
  justify-content: space-between;
}
.headtop > div > p > span {
  color: white;
}
.headnav {
  height: 60px;
  line-height: 60px;
  /* box-shadow: 10px 10px #e5e3e3; */
  box-shadow: 0px 10px 20px #ededed; /*阴影出现在元素下方*/
  background: #fff;
}
.header > div > div {
  width: 80%;
  margin: 0 auto;
}
.avarev > img {
  display: inline-block;
  width: 36px;
  height: 36px;
  vertical-align: middle;
}
.dish {
  display: inline-block;
  margin: 0 15px;
}
</style>