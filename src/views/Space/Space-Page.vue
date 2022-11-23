<template>
  <div>
    <TopHeader />
    <div class="space">
      <h4>欢迎来到我的美食空间</h4>
      <div class="userinfo">
        <p><img :src="userinfo.avatar" alt="" /></p>
        <div>
          <p>
            <b>{{ userinfo.name }}</b>
            <span 
                v-show='!isOwner' 
                :class="userinfo.isFollowing?'outFollow':'isFollow'"
                @click="userinfo.isFollowing=!userinfo.isFollowing"
            >{{userinfo.isFollowing ? '已关注' : '关注'}}</span>
          </p>
          <!-- 如果访问的是自己的空间，编辑个人资料显示，访问的是别人的空间不显示 -->
          <p>{{ userinfo.createdAt }} <span v-show="isOwner" @click="$router.replace('/edit')">|编辑个人资料</span></p>
        </div>
        <ul>
          <li>
            <p>关注</p>
            <b>{{ userinfo.follows_len }}</b>
          </li>
          <li>
            <p>粉丝</p>
            <b>{{ userinfo.following_len }}</b>
          </li>
          <li>
            <p>收藏</p>
            <b>{{ userinfo.collections_len }}</b>
          </li>
          <li>
            <p>发布菜谱</p>
            <b>{{ userinfo.work_menus_len }}</b>
          </li>
        </ul>
      </div>

      <div class="userinfor_more">
        <!-- tab -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="作品" name="works"></el-tab-pane>
          <el-tab-pane label="粉丝" name="fans"></el-tab-pane>
          <el-tab-pane label="关注" name="follow"></el-tab-pane>
          <el-tab-pane label="收藏" name="collection"></el-tab-pane>
        </el-tabs>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import TopHeader from '@/components/TopHeader/TopHeader'
import { reqUserInfo } from '@/api/ajax'
export default {
  components: {
    TopHeader
  },
  mounted () {
    this.$nextTick(() => {
      this.getuserInfo()
    })

  },
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {
      activeName: 'works',
      userinfo: {},
      isOwner: false,
    }
  },
  methods: {
    handleClick () {
        console.log(this.activeName)
      this.$router.replace({path:'./' + this.activeName,query:{...this.$route.query}})
    },
    async getuserInfo () {
      //判断显示那个用户的个人信息，
      //看地址栏是否有userId,有userId通过userid调用对应的接口查询
      //如果没有userid那说明就是登录的当前用户

      //如果把用户访问自己的个人空间也会发送请求，所以判断如果是访问自己的就不要发送请求
      //用户访问自己的条件 1.没有userid 2.userid和vuex存的Userid一样
      const userId = this.$route.query.userid;
      this.isOwner = !userId || userId === this.$store.state.userInfo.userId;
      //this.isOwner = !userId;
      if (this.isOwner) {//没有userId，获取当前登录的用户信息
        //  this.userinfo = this.userInfo;
        this.userinfo = this.$store.state.userInfo;
      } else { //有userId
        //ajax请求
        const res = await reqUserInfo({ userId })
        this.userinfo = res.data
      }
      this.activeName=this.$route.name
    },
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.space {
  width: 60%;
  margin: 0 auto;
  h4 {
    text-align: center;
    color: darkgray;
    font-size: 36px;
    margin: 40px 0 20px 0;
  }
  .userinfo {
    background: #fff;
    border-radius: 10px;
    height: 210px;
    display: flex;
    justify-content: flex-start;
    & >p>img{
        width:205px;
        height:100%;
    }
    & > p,
    & > ul {
      flex: 1;
      //    border:1px solid #000;
    }
    & > div {
      flex: 3;
      //    border:1px solid #000;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 20px;
      box-sizing: border-box;
      & > p:first-child {
        height: 45px;
        line-height: 45px;
        display: flex;
        justify-content: space-between;
        b {
          font-size: 24px;
        }
        span {
          display: inline-block;
          padding: 0px 15px;
          color: #fff;
          font-weight: bold;
        }
        .isFollow{
            background:red;
        }
        .outFollow{
             background:gray;
        }
      }
      & > p:nth-child(2) {
        height: 30px;
        line-height: 30px;
        color: #b6b1b1;
      }
    }
    & > ul {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        width: 50%;
        text-align: center;
        //    border:1px solid #000;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
  }
  .userinfor_more {
    margin-top: 15px;
  }
}
</style>