<template>
    <div class='stuff'>
        <div v-for="(item,index) in value" :key="index">
            <el-input v-model="item.name" placeholder="请输入主料" style="width:200px;"></el-input>
            <el-input v-model="item.specs" placeholder="请输入克数" style="width:200px;"></el-input>
            <i class='el-icon-error' @click="remove(index)"></i>
        </div>
         <el-button 
            type="primary" 
            icon="el-icon-circle-plus-outline"
            @click="add"
         >增加一项</el-button>
    </div>
</template>
<script>
export default{
    props:{
        value:{
            type:Array,
            required:true
        }
        // name:{
        //     type:String,
        //     required:true
        // },
        // specs:{
        //     type:String,
        //     required:true
        // }
    },
    methods:{
        add(){
            this.$emit('addCount',{ name: '', specs: '' })
        },
        remove(index){
             this.$emit('removeCount',index)
        }
    }
}
</script>
<style lang="less">
.stuff{
    display:inline-block;
    &>div{
        margin-left:30px;
        margin-top:30px;
    }
}
</style>