<template>
  <div>
    <fansComponent :lists="folling" v-if="folling.length"></fansComponent>
    <div class="emptyFollow" v-else>
      <p>还没有关注别人哦！多发布菜谱，更容易被找到。</p>
    </div>
  </div>
</template>
<script>
import fansComponent from '@/components/fansComponent/fansComponent.vue'
import { reqFolling } from '@/api/ajax.js'
export default {
  mounted () {
    this.getFolling();
  },
  components: {
    fansComponent
  },
  data () {
    return {
      folling: []
    }
  },
  methods: {
    async getFolling () {
      var userId;
      if (this.$route.query.userid) {
        userId = this.$route.query.userid;
      } else {
        userId = this.$store.state.userInfo.userId
      }
      //请求
      const res = await reqFolling({ userId })
      console.log(res);
      this.folling = res.data.list
    }
  }
}
</script>
<style lang="less">
.emptyFollow {
  text-align: center;
  margin-top: 50px;
}
</style>