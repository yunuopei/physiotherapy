<template>
  <div class="login-template-css">
    <el-row class="forgot-password-page">
      <el-col class="top">
        <img src="../assets/arrow.png" alt="" @click="redirectToIndex">
        <span class="text">
            忘记密码
          </span>
      </el-col>
      <div class="logo">
        <img src="../assets/logo.png">
      </div>
      <el-col class="form">
        <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off">
            <el-steps :active="currentStep" align-center finish-status="success" style="margin-top: 50px">
              <el-step title="选择主体"/>
              <el-step title="验证码"/>
              <el-step title="找回密码"/>
            </el-steps>
          <el-row v-if="currentStep === 0" style="margin-top: 20px">
            <el-col :span="24">
              <el-form-item prop="type" label="用户类型">
                <el-select v-model="formModel.type" placeholder="请选择用户身份">
                  <el-option label="用户" value="0"></el-option>
                  <el-option label="理疗师" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item>
              <el-button @click="goToNextStep" :disabled="!isStepValid" type="primary" auto-insert-space>下一步</el-button>
            </el-form-item>
          </el-row>
          <el-form-item v-if="currentStep === 1" style="margin-top: 20px">
            <el-col :span="16">
              <el-form-item prop="phonenumber">
                <el-input v-model="formModel.phonenumber" :prefix-icon="Iphone" placeholder="手机号" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-form-item>
                <el-button
                    @click="sendSMSCode(formModel.phonenumber)"
                    :disabled="!isPhoneValid || disableSendCode || buttonText !== '获取验证码'"
                    type="primary"
                >
                  {{ buttonText }}
                </el-button>
              </el-form-item>
            </el-col>
            <el-input v-model="formModel.code" :prefix-icon="Message" placeholder="验证码" style="margin-top: 20px"></el-input>
            <el-form-item>
              <el-button @click="goToNextStep" :disabled="!isStepValid" type="primary"  auto-insert-space style="margin-top: 10px">下一步</el-button>
            </el-form-item>
          </el-form-item>

          <el-form-item v-if="currentStep === 2" style="margin-top: 20px" prop="newPassword">
            <el-input v-model="formModel.newPassword" :prefix-icon="Lock" type="password" placeholder="新密码"></el-input>
          </el-form-item>
          <el-form-item v-if="currentStep === 2" prop="confirmPassword">
            <el-input v-model="formModel.confirmPassword" :prefix-icon="Lock" type="password" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item v-if="currentStep === 2">
            <el-button @click="resetPassword" :disabled="!isStepValid" class="button" type="primary" auto-insert-space>确认</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script setup>
import { Iphone, Lock } from '@element-plus/icons-vue'
import {computed, reactive, ref} from 'vue'
import axios from "axios";
import { ElMessage } from 'element-plus';
import router from "@/router";
import {createRouter as $router} from "vue-router";

const formModel = ref({
  type: '', // 添加type字段
  phonenumber: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
  uuid:''
})
const isPhoneValid = computed(() => {
  const phonePattern = /^1[3456789]\d{9}$/
  return !!formModel.value.phonenumber && phonePattern.test(formModel.value.phonenumber)
})

const isStepValid = computed(() => {
  if (currentStep.value === 0) {
    return !!formModel.value.type;
  } else if (currentStep.value === 1) {
    return !!formModel.value.code && !!formModel.value.phonenumber && showCode.value;
  } else if (currentStep.value === 2) {
    const newPasswordValid = !!formModel.value.newPassword && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(formModel.value.newPassword);
    const confirmPasswordValid = !!formModel.value.confirmPassword && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(formModel.value.confirmPassword);
    return newPasswordValid && confirmPasswordValid && formModel.value.newPassword === formModel.value.confirmPassword;
  }
})
const rules = reactive({
  phonenumber: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'change' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '密码必须8-16位，需大小写字母、数字', trigger: 'change' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'change' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '密码必须8-16位，需大小写字母、数字', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
})


const currentStep = ref(0)
const showCode = ref(false)
const checkCode = async () => {
  try {
    const response = await axios.post('/front/auth/checkCode', {
      phone: formModel.value.phonenumber,
      code: formModel.value.code,
      uuid:formModel.value.uuid,
    });
    const success = response.data.data;
    console.log(response.data)

    if (success) {
      // 验证码正确的操作
      currentStep.value = 2
    } else {
      // 验证码不正确的操作
      ElMessage.error("验证码不正确")
    }

  } catch (error) {
    console.error(error);
    // 处理错误情况
  }
};


const goToNextStep = () => {
  if (isStepValid.value) {
    if (currentStep.value === 1) {
      checkCode()
    } else if (currentStep.value === 0) {
      currentStep.value = 1
    }
  }
}

const countdown = ref(0) // 倒计时秒数
let timer // 定时器
const buttonText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value} 秒后重试`
  } else {
    return '获取验证码'
  }
})

const sendSMSCode = async (phone) => {

  // 发送验证码逻辑
  if (!phone) {
    ElMessage.warning("请输入手机号")
    return;
  }
  axios.post('/front/auth/sendSMSCode', {
    phone: phone
  }).then((response) => {
    countdown.value = 60
    buttonText.value = `${countdown.value} 秒后重试`
    timer = setInterval(() => {
      countdown.value = countdown.value - 1;
      if (countdown.value === 0) {
        clearInterval(timer)
        timer = undefined
        buttonText.value = '获取验证码'
      } else {
        buttonText.value = `${countdown.value} 秒后重试`
      }
    }, 1000)
    console.log(response.data);
    formModel.value.uuid=response.data.data.uuid
    // const code = response.data
    showCode.value = true
  }).catch((error) => {
    ElMessage.error("发送验证码失败，请稍后再试")
    console.error(error)
  }).finally(() => {
    console.log('发送验证码')
  })
}

const resetPassword = async () => {
  if (!isStepValid.value) {
    ElMessage.error("请填写正确的信息")
    return
  }if(formModel.value.confirmPassword!== formModel.value.newPassword){
    ElMessage.error("两次密码不一致")
    return
  }
  try {
    const response = await axios.put('/front/auth/forgetPwd', {
      phone: formModel.value.phonenumber ,
      code: formModel.value.code,
      newPassword: formModel.value.confirmPassword,
      uuid:formModel.value.uuid,
      type:formModel.value.type
    });
    const success = response.data.code;
    console.log(response.data)
    if (success===200) {
      ElMessage.success('密码重设成功');
      router.push('/login')
    } else {
      ElMessage.error(response.data.message);
    }

  } catch (error) {
    console.error(error);
    ElMessage.error('密码重设失败，请稍后再试');
  }
};

const redirectToIndex = () =>{
  router.push('/login')
}
</script>

<style scoped>
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
.forgot-password-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
.top{
  background-color: #00C5CD;
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
.form {
  box-shadow: none !important; /* 取消阴影 */
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

h2 {
  text-align: left;
  margin-bottom: 20px;
}

.button {
  width: 100%;
}
.el-button{
  background-color: #00C5CD; /* 设置选中背景颜色 */
  border-color: rgba(0,197,205,0.3); /* 设置选中边框颜色 */ /* 设置选中边框颜色 */
}
.el-button.is-disabled{
  color: white;
  background-color: rgba(0,197,205,0.3); /* 设置选中背景颜色 */
}

/*.button.is-disabled:hover{*/
/*  background-color: #00C5CD; !* 设置选中背景颜色 *!*/
/*  border-color: 	#00C5CD; !* 设置选中边框颜色 *!*/
/*}*/
</style>
