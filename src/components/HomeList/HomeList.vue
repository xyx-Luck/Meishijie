<template>
  <div>
    <div class="infinite-list-wrapper homelist" style="overflow: auto">
      <p class='title'><span>--</span>内容精选<span>--</span></p>
      <ul
        class="list"
      >
        <li v-for="(dish,index) in dishList" :key="index" class="list-item">
            <router-link :to="{path:'/detail',query:{menuId:dish.menuId}}">
                <img :src="dish.product_pic_url">
                <h6>{{dish.title}}</h6>  
                <p>{{dish.comments_len}}评论</p>
                <p><router-link :to="{path:'/space',query:{userid:dish.userId}}">{{dish.name}}</router-link></p>
            </router-link>
        </li>
      </ul>
     <!-- <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p> -->
    </div>
  </div>
</template>
<script>
  export default{
      props:{
          dishList:{
              type:Array,
              required:true
          },
      },
      data(){
          return{
            
          }
      },
  }

</script>
<style lang="less">
.homelist{
    width:60%;
    margin:0 auto;
    .title{
        text-align:center;
        font-size:24px;
        height:50px;
        line-height:50px;
        color:#7E7C7C;
        span{
        //   display:inline-block;
        //   width:10px;
        //   height:2px;
        //   color:#7E7C7C;
        }
    }
    ul{
        width:100%;
        display:flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        li{
            width:23%;
            margin-right:2%;
            text-align:center;
            background:#fff;
            padding-bottom:10px;
            margin-bottom:15px;
            img{
                width:100%;
                height:352.94px;
            }
            h6,p{
                height:35px;
                line-height:35px;
            }
        }
        li:last-child{
            margin-right:2%;
        }
    }
}
</style>