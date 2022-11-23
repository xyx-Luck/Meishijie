<template>
  <div>
    <MenuCard :menucard="collection" v-if="collection.length"></MenuCard>
    <div class="emptyCollection" v-else>
      <p>还没有收藏任何的菜谱，去搜自己喜欢的菜谱，收藏起来吧。</p>
      <el-button type="danger" @click="$router.replace('/home')"
        >菜谱大全</el-button
      >
    </div>
  </div>
</template>
<script>
import MenuCard from '@/components/MenuCard/MenuCard.vue'
import { reqCollection } from '@/api/ajax.js'
// import axios from 'axios'

export default {
  mounted () {
    this.getCollection()
  },
  data () {
    return {
      collection: []
    }
  },
  methods: {
    async getCollection () {
      //获取指定用户的id
      var userId;
      if (this.$route.query.userid) {
        userId = this.$route.query.userid;
      } else {
        userId = this.$store.state.userInfo.userId
      }
      console.log(userId)
      const res = await reqCollection({ userId });
      console.log(res)
      this.collection = res.data.list

    }
  },
  components: {
    MenuCard
  }
}
</script>
<style lang="less">
.emptyCollection {
  text-align: center;
  margin-top: 50px;
  .el-button {
    margin-top: 30px;
  }
}
</style>