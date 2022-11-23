<template>
  <div>
    <div class="step">
      <!-- 步骤 -->
      <div class="num"></div>
      <!-- 图片 -->
      <ImgUpload
        :imageUrl="$options.imageUrl"
        action="/api/upload?type=step"
        @res-url="changeUrl"
      ></ImgUpload>
      <!-- 评论 -->
      <el-input
        type="textarea"
        rows="10"
        placeholder="请输入内容"
        v-model="step.describe"
      >
      </el-input>
      <i class='el-icon-circle-close' @click="removeStep(index)"></i>
    </div>
  </div>
</template>
<script>
import ImgUpload from '@/components/Img-Upload/Img-Upload.vue'
export default {
  imageUrl: 'https://s1.c.meishij.net/n/images/upload_step_img.png',
  props: {
    step: {
      type:Object,
      default:()=>({})
    }
  },
  components: {
    ImgUpload
  },
//   mounted () {
//     this.changeUrl()
//   },
  methods: {
    changeUrl (data) {
        console.log(data);
      this.$emit('input', {
        ...this.step,
        // img_url: data.imageUrl
        img_url: data.resImgUrl
      })
    },
    removeStep(index){//删除步骤
       this.$emit('remove-step',index)
    }
  }
}
</script>
<style lang="less">
.step {
  display: flex;
  .num {
    flex: 1;
    text-align: center;
    line-height: 180px;
    font-size: 60px;
    font-weight: bold;
    color: #5f5f5f;
    font-style: italic;
  }
  .avatar-uploader {
    flex: 2;
  }
  .el-textarea {
    flex: 6;
  }
}
</style>