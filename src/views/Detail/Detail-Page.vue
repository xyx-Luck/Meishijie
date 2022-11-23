<template>
  <div class="menu-detail">
    <TopHeader></TopHeader>
    <div class="detail">
      <detail-header :info="details"></detail-header>
      <detail-content :info="details"></detail-content>
      <Comment></Comment>
    </div>
  </div>
</template>
<script>
import TopHeader from '@/components/TopHeader/TopHeader'
import DetailHeader from './detail-header'
import DetailContent from './detail-content'
import Comment from './comment'
import { reqMenuDetail } from '@/api/ajax.js'
// import {menuInfo} from '@/service/api';
export default {
  components: { TopHeader, DetailHeader, DetailContent, Comment },
  data () {
    return {
       details:{}
    }
  },
  mounted () {
    this.getMenuDetail()
  },
  methods: {
    async getMenuDetail () {
      //獲取menuId
      const { menuId } = this.$route.query;
      //  console.log(menuId)
      const res = await reqMenuDetail({ menuId });
      console.log(res);
      if (res.code === 0) {
        this.$message({
          message: res.mes,
          type: 'success'
        });
      }
      this.details=res.data.info
    }
  }
}
</script>
<style>
.detail {
  width: 60%;
  margin: 0 auto;
}
</style>
