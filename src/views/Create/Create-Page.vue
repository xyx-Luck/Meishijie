<template>
  <div>
    <TopHeader />
    <div class="create">
      <h3>欢迎发布菜谱，先介绍一下你的大作</h3>
      <section>
        <p>
          标题:<el-input
            v-model="backData.title"
            placeholder="请输入内容"
          ></el-input>
        </p>
        <p>
          属性:
          <el-select
            v-for="(proper, index) in properties"
            :key="index"
            v-model="backData.property[proper.title]"
            :placeholder="proper.parent_name"
          >
            <el-option
              v-for="(list, index) in proper.list"
              :key="index"
              :label="list.name"
              :value="list.type"
            >
            </el-option>
          </el-select>
        </p>
        <p>
          菜谱分类:
          <el-select v-model="backData.classify" placeholder="请选择">
            <el-option-group
              v-for="(group, index) in classifies"
              :key="index"
              :label="group.parent_name"
            >
              <el-option
                v-for="(item, index) in group.list"
                :key="index"
                :label="item.name"
                :value="item.type"
              >
              </el-option>
            </el-option-group>
          </el-select>
        </p>
        <!-- 上传成品图 -->
        <p class="finishProduct">
          <ImgUpload
            action="api/upload?type=product"
            :imageUrl="backData.product_pic_url"
            @res-url="
              (data) => {
                backData.product_pic_url = data.resImgUrl;
              }
            "
          ></ImgUpload>
          <el-input
            type="textarea"
            :rows="20"
            v-model="backData.product_story"
            placeholder="请输入内容"
          >
          </el-input>
        </p>
      </section>
      <h3>记录所有原材料</h3>
      <section>
        <div>
          <p>主料</p>
          <StuffCom
            :value="backData.raw_material.main_material"
            @addCount="addMain"
            @removeCount="removeMain"
          ></StuffCom>
        </div>
        <div>
          <p>辅料</p>
          <StuffCom
            :value="backData.raw_material.accessories_material"
            @addCount="addAccess"
            @removeCount="removeAccess"
          ></StuffCom>
        </div>
      </section>
      <h3>开始写步骤了！能否简单易学就看你怎么写了，加油！</h3>
      <section>
        {{ backData.steps }}
        <StepUpload 
            v-for="(item,index) in backData.steps"  
            :key="index"
            v-model="backData.steps[index]" 
            @remove-step="removeS"
        ></StepUpload>
        <el-button type="info" class="el-icon-plus" @click="addStep"
          >增加一步</el-button
        >
        <p>烹饪小技巧</p>
        <el-input
          type="textarea"
          :rows="10"
          placeholder="分享一下你做这道菜的心得和小技巧吧"
          v-model="backData.skill"
        >
        </el-input>
      </section>

      <el-button type="danger" :icon="icon" @click="send">搞定，提交审核</el-button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import TopHeader from '@/components/TopHeader/TopHeader.vue'
import { reqMenuProperty, reqMenuClassify,reqMenuPublish } from '@/api/ajax.js'
import ImgUpload from '@/components/Img-Upload/Img-Upload.vue'
import StuffCom from '@/components/Stuff/Stuff-Com.vue'
import StepUpload from '@/components/StepUpload/StepUpload.vue'
export default {
  components: {
    TopHeader,
    ImgUpload,
    StuffCom,
    StepUpload

  },
  mounted () {
    this.getMenuProperty()
    this.getMenuClassify()
  },
  data () {
    return {
      properties: [],
      classifies: [],
      icon:'',//el-icon-loading
      backData: {//backData.raw_material.main_material
        title: '',//标题
        property: {},
        classify: '',
        product_pic_url: 'https://s1.c.meishij.net/n/images/upload_big_img.png?_=1561906961',//成品图
        product_story: '', // 成品图故事
        raw_material: { // 料
          main_material: [{ name: '', specs: '' }, { name: '', specs: '' }, { name: '', specs: '' }], // 主料
          accessories_material: [{ name: '', specs: '' }, { name: '', specs: '' }, { name: '', specs: '' }], // 辅料
        },
        steps: [{ img_url: '', describe: '' }, { img_url: '', describe: '' }, { img_url: '', describe: '' }],
        skill:''
      }
    }
  },
  methods: {
    async getMenuProperty () {
      const res = await reqMenuProperty();
      this.properties = res.data;
      //循环res.data,把每一项的title放入property对象中
      //   res.data.forEach(data => {
      //     this.backData.property[data.title] = ''
      //   });
      this.backData.property = res.data.reduce((o, item) => {
        o[item.title] = '';
        return o;
      }, {});
    },
    async getMenuClassify () {
      const res = await reqMenuClassify();
      console.log(res);
      this.classifies = res.data
    },
    addMain (data) {//新增一项
      alert(1)
      this.backData.raw_material.main_material.push(data)
    },
    removeMain (i) {
      this.backData.raw_material.main_material.splice(i, 1)
    },
    addAccess (data) {//新增一项
      alert(2)
      this.backData.raw_material.accessories_material.push(data)
    },
    removeAccess (i) {
      this.backData.raw_material.accessories_material.splice(i, 1)
    },
    addStep () {
      this.backData.steps.push({ img_url: '', describe: '' })
    },
    removeS (index) {
      alert(index)
      this.backData.steps.splice(index, 1)
    },
    async send(){
        // console.log(this.backData)
        this.icon='el-icon-loading'
        //ajax
        const res=await reqMenuPublish(this.backData);
        console.log(res);
        this.$router.replace('/space')

    }
  }
}
</script>
<style lang="less">
.create {
  width: 60%;
  margin: 0 auto;
  //   background: #fff;
  padding: 20px;
  h3 {
    width: 100%;
    text-align: center;
  }
  section {
    background: #fff;
    margin: 30px 0;
    padding: 20px;
  }
}
.finishProduct {
  display: flex;
  justify-content: flex-start;
  .imgUpload {
    flex: 1;
  }
  .el-textarea {
    flex: 3;
    margin-left: 5px;
  }
  .el-button--danger{
      margin:0 auto;
  }
}
</style>