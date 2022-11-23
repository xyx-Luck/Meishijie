<template>
  <div>
    <TopHeader />
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="(banner, index) in bannerList" :key="index">
        <img :src="banner.product_pic_url" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 内容精选 -->
    <HomeList :dishList='dishList'/>
  </div>
</template>
<script>
import TopHeader from '../../components/TopHeader/TopHeader.vue'
import HomeList from '../../components/HomeList/HomeList.vue'
//引入ajax
import { reqBanner,reqDishList } from '../../api/ajax.js'
export default {
  data () {
    return {
      bannerList: [],
      dishList:[]
    }
  },
  components: {
    TopHeader,
    HomeList
  },
  mounted () {
    this.getBanner();
    this.getDishList();
  },
  methods: {
    async getBanner () {
      const res = await reqBanner();
      if (res.code === 0) {
        this.bannerList = res.data.list;
      }
    },
    //获取内容精选
    async getDishList () {
      const res = await reqDishList({page:1});
      this.dishList=res.data.list
    }
  },
}
</script>
<style lang="less">
.el-carousel {
  width: 60%;
  margin: 0 auto;
  img {
    width: 600px;
    height: 800px;
  }
}
</style>