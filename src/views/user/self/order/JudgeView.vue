<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            真实、有效的分享更受欢迎哦
          </span>
    </el-col>
  </el-row>
  <div class="scrollbar-body">
    <el-scrollbar>
      <div style="padding:5px;text-align: center">
        <UploadComponent class="custom-upload" @upload-success="handleUploadSuccess" :coverUrl=true></UploadComponent>
      </div>
      <div style="text-align: left;background-color:#00C5CD;padding: 5px;margin-top: 10px">
        <span style="margin-left: 10px;">我的评分</span>
        <el-rate
            style="margin-left: 20px;"
            allow-half
            v-model="value"
            show-score
            text-color="#ff9900"
            score-template="{value}分"
            size="large"
        />
      </div>
      <el-input
          class="input"
          v-model="textarea"
          maxlength="300"
          :rows="18"
          placeholder="说些什么~"
          show-word-limit
          type="textarea"
      />
      <el-row class="button-in">
        <el-col :span="22" :offset="1">
          <el-button class="el-button-in" @click="submitText">
            确认提交
          </el-button>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script setup>
import UploadComponent from '@/components/user/UploadComponent.vue';
import router from "@/router";
import {ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
const textarea = ref()

const value = ref()

const redirect=()=>{
  router.back();
}
const submitText= () => {
  if (textarea.value !==undefined){
    if(textarea.value.length<10){
      ElMessage.error("输入至少10个字")
    }else{
      axios.post('/system/comment', {
        content: textarea.value
      }).then((res) => {
        if (res.data.code == 200) {
          ElMessage.success("提交成功")
          // console.log(res.data)
        } else {
          ElMessage.error(res.data.msg)
        }
      }).catch((e) => {
        console.log(e)
        ElMessage.error("提交失败")
      })
      router.push('/self');
    }
  }else {
    ElMessage.error("不能输入为空")
  }


}
</script>

<style scoped>
.top{
  position: fixed;
  background-color: #00C5CD;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  z-index: 999;
}
.top img{
  width: 30px;
  height: 30px;
  margin-top: 8px;
  transform: scale(0.8);
}
.text{
  margin-top: 4px;
  margin-left: 5px; /* 将 "登录" 文字置于右侧位置 */
  font-size: 17px;
  color: #ffffff;
  font-weight: bold;
}
.scrollbar-body{
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50px;
  width: 100%;
  height: calc(100% - 50px);
}
.input{
  min-height: 200px;
}
.button-in{
  position: relative;
  top: 5%;
}
.el-button-in{
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 100%;
  background-color: #00C5CD;
  color: white;
  font-size: 18px;
  letter-spacing: 6px;
  margin-top: 20px;
}
.el-textarea__inner{
  min-height: 300px;
}
</style>