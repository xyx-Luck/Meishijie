<template>
  <div>
    <fansComponent :lists="fans" v-if="fans.length"></fansComponent>
    <div class="emptyFans" v-else>
      <p>还没有被关注哦！多发布菜谱，更容易被找到。</p>
    </div>
  </div>
</template>
<script>
import fansComponent from '@/components/fansComponent/fansComponent'
// import axios from 'axios'
import { reqFans } from '@/api/ajax'
export default {
  mounted () {
    this.getFans()
  },
  data () {
    return {
      fans: []
    }
  },
  methods: {
    async getFans () {
      var userId;
      if (this.$route.query.userid) {
        userId = this.$route.query.userid;
      } else {
        userId = this.$store.state.userInfo.userId
      }
      const res = await reqFans(userId)
      console.log(res);
      this.fans = res.data.list
    }
  },
  components: {
    fansComponent
  }
}
</script>
<style lang="less">
.emptyFans {
  text-align: center;
  margin-top: 50px;
}
</style>