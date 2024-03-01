<template>
  <div>
    <el-row>
      <el-col class="top">
        <img src="@/assets/arrow.png" alt="" @click="redirect">
        <span class="text">
            修改密码
          </span>
      </el-col>
    </el-row>
  </div>
  <div style="margin-top: 70px;">
    <div style="display: flex; justify-content: center;">
      <el-form
          ref="passwordForm"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldPassword" label-width="80px">
          <el-input v-model="ruleForm.oldPassword" placeholder=""  type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" label-width="80px">
          <el-input v-model="ruleForm.newPassword" type="password" placeholder="" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword"  label-width="80px">
          <el-input
              v-model="ruleForm.checkPassword"
              type="password"
              autocomplete="off"
              placeholder=""
          />
        </el-form-item>
        <el-form-item style="margin-top: 60px;">
          <el-button @click="submitForm" class="button" type="" auto-insert-space>确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from "axios";
import { ElMessage } from 'element-plus';
import router from "@/router";

const ruleForm = ref({
  oldPassword: '',
  newPassword: '',
  checkPassword: ''
})
const passwordForm=ref()
const rules = {
  oldPassword: [
    { required: true, message: '请输入密码', trigger: 'change' },
  ],
  newPassword: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '8-16位，需大小写字母、数字', trigger: 'change' }
  ],
  checkPassword: [
    { required: true, message: '请再次输入密码', trigger: 'change' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '8-16位，需大小写字母、数字', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.value.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
}

const submitForm = async () => {
  const valid = await passwordForm.value.validate()
  if (valid) {
    await axios.put('/front/auth/resetPwd', {
      oldPassword: ruleForm.value.oldPassword,
      newPassword: ruleForm.value.newPassword
    }).then((response) => {
      console.log(response.data)
      let Code = response.data.code
      if (Code !== 200) {
        ElMessage.error(response.data.msg)
      } else {
        ElMessage.success("修改成功")
        router.push('/self')
      }
    }).catch((error) => {
      console.log(error)
    })
  } else {
    // 表单验证不通过，显示错误提示
    ElMessage.error("请填写正确的数据")
  }
}
const redirect = () => {
  // 使用编程式导航进行页面跳转
  router.back();
};
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
.button {
  font-size: 15px;
  width: 100%;
  background-color: #00C5CD;
  color: white;
}
</style>
