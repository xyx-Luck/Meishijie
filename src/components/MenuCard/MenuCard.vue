<template>
    <div class='works'>
       
            <!-- @click="$router.replace({name:'detailpage',params:{menuId:menu.menuId}})" -->
            <el-card 
                class="box-card" 
                v-for="(menu,index) in menucard" 
                :key='index' 
            >
         <router-link :to="{name: 'detailpage', query: {menuId: menu.menuId}}">    
                <p>{{menu}}</p>
                <img :src="menu.product_pic_url" alt="">
                <div>
                    <p>{{menu.title}}</p>
                    <p>{{menu.comments_len}}评论</p>
                    <p>{{menu.name}}</p>
                </div>
        </router-link>        
            </el-card>
        
    </div>
</template>
<script>
export default{
    props:{
       menucard:{
           type:Array,
           required:true
       }
    }
}
</script>
<style lang="less">
*{
    margin:0;
    padding:0;
}
.works{
    display:flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .el-card{
        width:22%;
        margin-left:2%;
        margin-bottom:2%;
        img{
            width:100%;
            height:232px;
        }
    }
}
</style>
