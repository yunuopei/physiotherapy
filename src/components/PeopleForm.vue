<template>
  <div class="login-template-css">
    <div style="margin-left: 10px;text-align:left;margin-top: 5px">
      <span style="font-weight: bolder;font-size: 17px">预约信息</span>
    </div>
    <div class="login-page">
      <el-col class="form" >
        <!-- 注册用户相关表单 -->
        <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off">
          <el-form-item prop="name">
            <el-input  :style="{ border: 'none', background: 'none' }" v-model="formModel.name" :prefix-icon="User" placeholder="姓名" />
          </el-form-item>
          <el-form-item prop="phonenumber">
            <el-input v-model="formModel.phonenumber" :prefix-icon="Iphone" placeholder="手机号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="date">
            <div>可预约日期</div>
            <el-scrollbar style="height: 80px;">
              <div class="container">
                <div class="item" v-for="day in 7" :key="day" :class="{ 'highlight': selectedDay === day }" @click="selectDay(day)">
                  <div>
                    <span>周五</span>
                  </div>
                  <div>
                    <span>01-12</span>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </el-form-item>
          <el-form-item prop="time">
            <div>可预约时间</div>
              <div class="container1" >
                <div class="item1" v-for="hour in 9" :key="hour" :class="{ 'highlight': selectedHour === hour }" @click="selectHour(hour)">
                  <div>
                    <span>{{ hour }}:00</span>
                  </div>
                </div>
              </div>
          </el-form-item>
          <el-form-item >
            <el-button @click="submitForm" class="button" type="danger" auto-insert-space>
              预约
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>

  </div>

</template>

<script setup>
import { Iphone, User, Lock,Message,Calendar,Clock } from '@element-plus/icons-vue'
import { computed, reactive, ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElMessageBox, ElRadio, ElRadioGroup} from "element-plus";
import axios from "axios";
import router from "@/router";
import {useUserStore} from "@/stores/user";
import {encryptedData, encryptedString} from "@/api/getNormalData";

const formModel = ref({
  phonenumber: '',
 name:''
})
const rules = reactive({
  phonenumber: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    { pattern: /^1[3456789]\d{9}$/, message: '输入正确手机号', trigger: 'change' }
  ],
  name:[
    { required: true, message: '请输入姓名', trigger: 'change' },
    { pattern: /^[A-Za-z\u4e00-\u9fa5]{1,}$/, message: '输入正确姓名', trigger: 'change' }
  ],
})
const countdown = ref(0)// 倒计时秒数
const form=ref()
const selectedHour=ref(1)
const selectedDay=ref(1)
const userStore = useUserStore()
const selectHour= (hour)=> {
  selectedHour.value = hour;
}
const selectDay= (day)=> {
  selectedDay.value = day;
}
const submitForm = () => {
  form.value.validate((valid) => {
    if (valid) {
      userRegister();
    } else {
      ElMessage.error('请填写正确信息');
    }
  });
};
const userRegister=()=>{

};


</script>

<style scoped>

.login-template-css{
  border-radius: 10px;
  padding: 5px;
  margin-left: 10px;
  margin-right: 10px;
  width: calc(100vw-20px);
  height: 100%;
  background-color: #ffffff;
  background-size: 100% 100%;
}
/* 表单样式 */
.form {
  /*margin-top:50px;*/
  box-shadow: none !important; /* 取消阴影 */
  padding: 10px;
  background-color: #ffffff; /* 设置表单背景颜色 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  border-radius: 5px; /* 圆角边框 */
}

/* 按钮样式 */
.button {
  font-size: 15px;
  width: 100%;
  background-color: 	#00C5CD;
  border-color: #00C5CD;
}
.el-radio__input.is-checked + .el-radio__label {

  color: #000000 !important;

}
.confirm-button-class{
  background-color: #00C5CD; /* 设置选中背景颜色 */
  border-color: 	#00C5CD; /* 设置选中边框颜色 */
}
/deep/ .el-input__inner {
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  /*outline: medium;*/
}
.container {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}
.container1 {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  width: 50px;
  height: 70px;
  background-color: rgba(0, 197, 205, 0.3);
  margin-left: 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.item1 {
  width: 50px;
  height: 40px;
  background-color: rgba(0, 197, 205, 0.3);
  margin-left: 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
.highlight {
  background-color: rgba(0,197,205,0.9);
}
/deep/ .el-scrollbar__thumb {
  display: none;
}
</style>
