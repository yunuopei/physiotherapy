<template>
  <div class="login-template-css">
    <el-row class="login-page">
      <el-col class="top">
        <img src="../../assets/arrow.png" alt="" @click="redirectToIndex">
        <span class="text">
            注册新用户
          </span>
      </el-col>
      <div class="logo">
        <img src="../../assets/logo.png">
      </div>
      <el-col class="form" >
        <!-- 注册用户相关表单 -->
        <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off">
          <el-row>
            <el-col :span="15">
              <el-form-item prop="phonenumber">
                <el-input v-model="formModel.phonenumber" :prefix-icon="Iphone" placeholder="手机号" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-form-item>
                <el-button @click="sendSMSCode(formModel.phonenumber)"
                           :disabled="disableSendCode || buttonText !== '发送验证码'" class="send-code-button">{{buttonText}}
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="validation">
            <el-input v-model="formModel.validation" :prefix-icon="Message" placeholder="手机验证码"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                v-model="formModel.password"
                :prefix-icon="Lock"
                type="password"
                placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirm_password">
            <el-input
                v-model="formModel.confirm_password"
                :prefix-icon="Lock"
                type="password"
                placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item >
            <el-button @click="submitForm" class="button" type="danger" auto-insert-space>
              注册
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>

</template>

<script setup>
import { Iphone, User, Lock,Message } from '@element-plus/icons-vue'
import { computed, reactive, ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElMessageBox, ElRadio, ElRadioGroup} from "element-plus";
import axios from "axios";
import router from "@/router";
import {useUserStore} from "@/stores/user";
import {encryptedData, encryptedString} from "@/api/getNormalData";

const formModel = ref({
  phonenumber: '',
  confirm_password:'',
  password: '',
  validation:'',
})
const buttonText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value} 秒后重试`
  } else {
    return '发送验证码'
  }
}) //手机验证码
const rules = reactive({
  phonenumber: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    { pattern: /^1[3456789]\d{9}$/, message: '输入正确手机号', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    {pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '8-16位，需大小写字母、数字', trigger: 'change'}
  ],
  confirm_password: [
    {required: true, message: '请再次输入密码', trigger: 'change'},
    {pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '8-16位，需大小写字母、数字', trigger: 'change'},
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  validation:[
    {required: true, message: '请填写验证码', trigger: 'change'},
    {pattern: /^\d{6}$/, message: '请输入6位数字', trigger: 'change'}
  ],
})
const countdown = ref(0)// 倒计时秒数
const form=ref()
const userStore = useUserStore()
const submitForm = () => {
  form.value.validate((valid) => {
    if (valid) {
      userRegister();
    } else {
      ElMessage.error('请填写正确的账号和密码');
    }
  });
};
const userRegister=()=>{

};
const sendSMSCode = async (phone) => {
  // 发送验证码逻辑
  axios.post('/front/auth/sendSMSCode', {
    phone: phone
  }).then((response) => {

    countdown.value = 60
    timer.value = setInterval(() => {
      countdown.value = countdown.value - 1;
      if (countdown.value === 0) {
        clearInterval(timer.value)
        timer.value = undefined
      }
    }, 1000)
    code.value = response.data.data.uuid

  }).catch((error) => {
    console.error(error)
  }).finally(() => {
    console.log('发送验证码')
  })
}
const redirectToIndex = () =>{
  router.push('/login')
};
</script>

<style scoped>
.login-template-css{
  width: 100vw;
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
/* 表单样式 */
.form {
  /*margin-top:50px;*/
  box-shadow: none !important; /* 取消阴影 */
  padding: 20px;
  background-color: #ffffff; /* 设置表单背景颜色 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  border-radius: 5px; /* 圆角边框 */
}
.send-code-button{
  margin-right: 0px;
  background-color: #00C5CD;
  width: 100%;
  color: white;
}
h1 {
  text-align: center; /* 设置标题居中 */
  margin-bottom: 20px; /* 底部留白 */
}
a{
  text-decoration: none; /* 去除下划线 */
  color: inherit;
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
