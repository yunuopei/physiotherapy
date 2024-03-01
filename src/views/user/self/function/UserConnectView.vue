<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            联系我们
          </span>
    </el-col>
  </el-row>
  <div class="scrollbar-body">
  <el-scrollbar>
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
          确认留言
        </el-button>
      </el-col>
    </el-row>
  </el-scrollbar>
</div>
</template>

<script setup>
import router from "@/router";
import {ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
const textarea = ref()
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
  margin-top: 2%;
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