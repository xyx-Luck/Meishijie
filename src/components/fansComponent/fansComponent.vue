<template>
    <div class='fans'>
        <ul>
            <li  v-for="(list,index) in lists" :key='index'>
                <router-link :to="{path:'/space'}">
                    <p><img :src="list.avatar"></p>
                    <div>
                        <p><b>{{list.name}}</b></p>
                        <p>粉丝：<span>{{list.follows_len}}</span> | 关注：<span>{{list.following_len}}</span></p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default{
    props:{
        lists:{
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
.fans{
    padding:20px 0;
    background:#fff;
    li{
        padding:15px;
       
        border-bottom:1px solid rgb(202, 199, 199);
        a{
             display:flex;
             justify-content: flex-start;
             p>img{
                 width:120px;
                 height:120px;
             }
            div{
                margin-left:20px;
                display:flex;
                flex-direction: column;
                justify-content: space-around;
            }
        }
    }
}
</style>