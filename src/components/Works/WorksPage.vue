<template>
    <div>
        <MenuCard :menucard="UserDishList" v-if="UserDishList.length"></MenuCard>

        <div class="emptyWork" v-else>
            <p>私房菜不要偷偷享用哦~~制作成菜谱与大家分享吧！</p>
            <el-button type="danger">发布菜单</el-button>
        </div>
    </div>
       
</template>
<script>
import MenuCard from '@/components/MenuCard/MenuCard.vue'
import {reqDishList} from '@/api/ajax.js'
export default{
    mounted(){
        this.getUserDishList()
    },
    data(){
        return{
            UserDishList:[]
        }
    },
    methods:{
        async getUserDishList(){//根据用户Id查询对应的菜单
          //获取当前用户的id
          var userId;
          if(this.$route.query.userid){
              userId=this.$route.query.userid;
          }else{
              userId=this.$store.state.userInfo.userId
          }
          //请求
          const res=await reqDishList({userId})
          console.log(res)
          this.UserDishList=res.data.list;
          console.log(this.UserDishList)
        }
    },
    components:{
        MenuCard
    }
}
</script>
<style lang="less">
.emptyWork{
    text-align:center;
    margin-top:50px;
    .el-button{
        margin-top:30px;
    }
}
</style>

