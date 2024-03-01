<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            修改昵称
          </span>
    </el-col>
  </el-row>
  <div class="scrollbar-body">
    <el-scrollbar>
      <el-input
          class="input"
          v-model="textarea"
      />
      <div style="text-align: right;margin-top: 5px;margin-right: 5px">
        <span style="color:gray;font-size: 15px">20个字符以内，不能为空</span>
      </div>
      <el-row class="button-in">
        <el-col :span="22" :offset="1">
          <el-button class="el-button-in" @click="submitText">
            保存昵称
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
const textarea = ref('hh')
const redirect=()=>{
  router.back();
}
const submitText= () => {
  if (textarea.value !==undefined){
    const length = textarea.value.replace(/[^\x00-\xff]/g, '**').length; // 将中文替换成两个英文字符再计算长度
    if (length > 20) {
      ElMessage.error("不得超过20个字符");
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
      router.push('/user/self/infor/detail');
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
  min-height: 50px;
  margin-top: 2%;
  font-size: 18px;
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