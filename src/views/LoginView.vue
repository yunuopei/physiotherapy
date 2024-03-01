<template>
  <div class="login-template-css">
    <el-row class="login-page">
      <el-col class="top">
        <img src="../assets/arrow.png" alt="" @click="redirectToIndex">
        <span class="text">
            登录
          </span>
      </el-col>
      <div class="logo">
        <img src="../assets/logo.png">
      </div>
      <el-col class="form" >
        <!-- 注册用户相关表单 -->
        <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off">
          <el-form-item prop="phonenumber">
            <el-input v-model="formModel.phonenumber" :prefix-icon="Iphone" placeholder="手机号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                v-model="formModel.password"
                :prefix-icon="Lock"
                type="password"
                placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="type" label="用户身份" style="margin-bottom: 6px">
            <el-radio-group v-model="formModel.type">
              <el-radio label="0" >用户</el-radio>
              <el-radio label="1">理疗师</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item >
            <el-button @click="submitForm" class="button" type="danger" auto-insert-space>
              登录
            </el-button>
          </el-form-item>
          <el-row style="margin-bottom: 15px ; padding-bottom: 112px">
            <el-col :span="12" style="text-align: left">
              <router-link to="/user/register" style="">注册新账号</router-link>
            </el-col>
            <el-col :span="12" style="text-align: right">
              <router-link to="/retrieve" style="">忘记密码</router-link>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

  </div>

</template>

<script setup>
import { Iphone, User, Lock } from '@element-plus/icons-vue'
import { computed, reactive, ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElMessageBox, ElRadio, ElRadioGroup } from "element-plus";
import axios from "axios";
import router from "@/router";
import {useUserStore} from "@/stores/user";
import {encryptedData, encryptedString} from "@/api/getNormalData";

const formModel = ref({
  type: '0',
  phonenumber: '',
  password: '',
  remeberMe:false
})

const rules = reactive({
  type: [
    { required: true, message: '请选择用户类型', trigger: 'change' }
  ],
  phonenumber: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    { pattern: /^1[3456789]\d{9}$/, message: '输入正确手机号', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^\S{6,15}$/, message: '密码必须是6-16位的非空字符', trigger: 'change' }
  ]
})
const form=ref()
const userStore = useUserStore()
const submitForm = () => {
  form.value.validate((valid) => {
    if (valid) {
      userLogin();
    } else {
      ElMessage.error('请填写正确的账号和密码');
    }
  });
};
const userLogin = async () => {
  let loginUrl = '/front/user/login';
  axios.post(loginUrl, {
    phone: formModel.value.phonenumber,
    password: encryptedString(formModel.value.password),
    type:formModel.value.type,
  }).then(async (response) => {
    // console.log(formModel.value.remeberMe)
    // console.log(response.data);
    if (response.data.code === 200) {
      ElMessage.success('登录成功');
      // 跳转至首页
      // sessionStorage.setItem('authId',response.data.data.authId)
      let data = await userStore.getUserSession()
      if (data.code === 200) {
        userStore.setUserInfo(data.data)
        userStore.setNotice(0)

        const expirationDate = new Date();
        if(formModel.value.remeberMe){
          expirationDate.setDate(expirationDate.getDate() + 7);
        }else {
          expirationDate.setDate(expirationDate.getDate() + 1);
        }
        userStore.setIsLogin(true)
        userStore.setExpiresAt(expirationDate.getTime())


      } else {
        userStore.setUserInfo(null)
      }
      router.push('/')
    }else{
      ElMessage.error('账号或密码错误');
    }
  }).catch((error) => {
    console.error(error)
    ElMessage.error('网络错误，请稍后再试。');
  })
}

const redirectToIndex = () =>{
  router.push('/')
}
</script>

<style scoped>
.login-template-css{
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  background-size: 100% 100%;
}
.top{
  background-color: 	#00C5CD;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
.top img{
  margin-top: 8px;
  transform: scale(0.8);
}
.text{
  margin-top: 4px;
  margin-left: 5px; /* 将 "登录" 文字置于右侧位置 */
  font-size: 17px;
  color: #ffffff;
}
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
}
.logo img{
  width: 50%;
  height: 50%;
}
/* 表单样式 */
.form {
  /*margin-top:50px;*/
  box-shadow: none !important; /* 取消阴影 */
  padding: 20px;
  background-color: #ffffff; /* 设置表单背景颜色 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  border-radius: 5px; /* 圆角边框 */
}

h1 {
  text-align: center; /* 设置标题居中 */
  margin-bottom: 20px; /* 底部留白 */
}
a{
  text-decoration: none; /* 去除下划线 */
  color: inherit;
}

/* 按钮样式 */
.button {
  font-size: 15px;
  width: 100%;
  background-color: 	#00C5CD;
  border-color: #00C5CD;
}

.el-radio__input.is-checked .el-radio__inner {
  background-color: 	#e50404 ;/* 设置选中背景颜色 */
  border-color: 	#e50404 ;/* 设置选中边框颜色 */
}
.el-radio__input.is-checked + .el-radio__label {

  color: #000000 !important;

}
.confirm-button-class{
  background-color: #00C5CD; /* 设置选中背景颜色 */
  border-color: 	#00C5CD; /* 设置选中边框颜色 */
}
</style>
