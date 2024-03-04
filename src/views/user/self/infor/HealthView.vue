<template>
  <el-row>
    <el-col class="top">
      <img src="@/assets/arrow.png" alt="" @click="redirect">
      <span class="text">
            健康档案
          </span>
      <span v-if="hasUpdate" class="text" style="margin-left: auto;margin-right: 10px;" @click="saveAll">保存</span>
      <span v-else-if="status===1" class="text" style="margin-left: auto;margin-right: 10px;" @click="InputUpdate">修改</span>
      <span v-else-if="status===null" class="text" style="margin-left: auto;margin-right: 10px;" @click="InputUpdate">添加</span>
    </el-col>
  </el-row>
  <el-col v-loading="loading" class="scrollbar-body" style="background-color:white;">
    <el-scrollbar>
      <div class="upload-section">
        <div class="upload-text" style="margin-top: 10px;font-size: 17px;margin-left: 10px">档案材料：</div>
      </div>
      <div v-if="fileList.length===0&&!hasUpdate" style="text-align: center ;"><el-empty :image-size="200" description="暂无数据,待添加" /></div>
      <div v-else v-for="(file, index) in fileList" :key="index" class="uploaded-image">
        <div v-if="hasUpdate" @mouseover="showDeleteButton(index)"
             @mouseleave="hideDeleteButton(index)">
          <img :src="`/front/fileInfo/downloadFile/${file}`" alt="uploaded image" style="">
          <div v-if="deleteButtonIndex === index" class="overlay"  @click="deleteImage(index)">
            <Delete class="delete-button" style="width: 1.5em; height: 1.5em;color: white;margin-left: 20px" />
          </div>
        </div>
        <div v-else>
          <img :src="`/front/fileInfo/downloadFile/${file}`" alt="uploaded image" style="" >
        </div>
        <div class="gray-line"></div>
        <el-dialog v-model="dialogVisible" style="width:100%">
          <img style="width:100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div v-if="hasUpdate" style=" display: flex;justify-content: center;margin-top: 10px">
        <UploadComponents @upload-success="handleUploadSuccess"></UploadComponents>
      </div>
      <div class="upload-section" style="margin-top: 30px">
        <div class="upload-text" style="font-size: 17px;margin-left: 10px">相关描述</div>
      </div>
      <div v-if="textInput===''&&!hasUpdate" style="text-align: center ;"><el-empty :image-size="200" description="暂无数据,待添加"/></div>
      <div v-else>
        <div v-if="!hasUpdate" style="margin-top:20px;white-space: pre-wrap;pxword-wrap: break-word; width: 95%; line-height: 1.5; letter-spacing: 1.3px;margin-left: 10px">
          {{ textInput }}
        </div>
        <div v-else style="width: 100%;">
          <div class="input-container">
            <el-input
                class="input"
                v-model="textInput"
                :rows="15"
                placeholder="请输入相关描述信息"
                show-word-limit
                type="textarea"
            ></el-input>
            <div class="button-container">
              <el-button @click="resetInput" style="width: 300%;right:10px ">重置</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-col>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import router from "@/router";
import UploadComponents from '@/components/user/UploadComponents.vue';
import {ElUpload, ElButton, ElRow, ElCol, ElInput, ElDialog, ElMessage, ElMessageBox,ElTreeSelect} from 'element-plus';
import {Search,Edit,Delete,Plus,View} from "@element-plus/icons-vue";
import {nextTick} from "@vue/runtime-core";
import axios from "axios";
const aid=ref(null)
const status=ref(null)
const loading=ref(true)
const fileList = ref([]);
const textInput = ref('');
const hasUpdate = ref(false);
const dialogVisible = ref(false);
const dialogImageUrl = ref('');
const cause=ref('')
const party=ref({
  description: "",
  pictureList: [],
  unitId:""
})
const types=ref('')
const deleteButtonIndex = ref(-1);

const showDeleteButton = (index) => {
  deleteButtonIndex.value = index;
};

const hideDeleteButton = () => {
  deleteButtonIndex.value = -1;
};
const deptList = ref([])

onMounted(async() => {
  axios.get('/front/user')
      .then(response => {
        // console.log(response.data.data)
        party.value.description=response.data.data.description
        party.value.unitId=response.data.data.unitId
        party.value.pictureList = JSON.parse(response.data.data.pictureIdList.replace(/(\d+)/g, '"$1"'));
        fileList.value = JSON.parse(response.data.data.pictureIdList.replace(/(\d+)/g, '"$1"'));
        textInput.value=response.data.data.description
        status.value=response.data.data.status
        aid.value=response.data.data.unitId
        cause.value=response.data.data.examineMsg
      })
      .catch(error => {
        ElMessage.error('获取数据失败', error);
      });
  loading.value=false
})
const handleUploadSuccess = (data) => {
  fileList.value.push(data._rawValue.data);
  // console.log("data",data._rawValue.data);
};

const InputUpdate=() =>{
  hasUpdate.value =true
}
const deleteImage = (index) => {
  // ElMessage.success('删除成功');
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm("此操作将删除该图片, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
        .then(() => {
          resolve();
          fileList.value.splice(index, 1);
        })
        .catch(() => {
          reject(false);
        });
  });
};

const resetInput=()=>{
  fileList.value =party.value.pictureList
  textInput.value=party.value.description
  aid.value=party.value.unitId
}
const redirect = () => {
  // 处理返回上一页的逻辑
  router.back()
};
const saveAll=async()=>{
  if(fileList.value.length===0){
    ElMessage.error("图片不能为空")
    return
  }
  if(textInput.value.trim().length ===0){
    ElMessage.error("描述不能为空")
    return
  }
  party.value.unitId=aid.value
  party.value.pictureList=fileList.value
  party.value.description =textInput.value
  await axios.post('/front/user/partyCertify', party.value)
      .then(response => {
        if(response.data.code!==200){
          fileList.value=party.value.pictureList
          textInput.value=party.value.description
          aid.value=party.value.unitId
          ElMessage.error(response.data.msg)
          window.location.reload()
        }else{
          ElMessage.success("保存成功")
          location.reload()
        }
      })
      .catch(error => {
        console.error('保存失败', error);
      });
  hasUpdate.value = false;
};
</script>

<style scoped>
.gray-line {
  width: 100%;
  height: 1px;
  background-color: gainsboro;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  margin-top: 10px;
}
.type-item {
  border-radius: 6px;
  background-color: #e7faf0;
  border-color: #d0f5e0;
  color: #13ce66;
  letter-spacing: 4px;
  margin-left: 20px;
  margin-bottom: 10px;
}
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

.title {
  font-size: 18px;
  color: white;
  margin-left: 10px;
}
.input{
  min-height: 200px;
  margin-top: 2%;
  width: 92%;
}
.scrollbar-body{
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50px;
  width: 100%;
  height: calc(100% - 50px);
}
::v-deep .el-scrollbar__bar{
  display: none;
}
.upload-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.upload-text {
  font-size: 16px;
  margin-right: 20px;
}
::v-deep .el-upload .el-upload-dragger {
  width: 120%;
  height: 80%;
}
.upload-button {
  font-size: 24px;
}

.uploaded-image {
  margin-top: 3px; /* 添加一个底部间距 */
  position: relative;
  display: inline-block;
  text-align: center;
  margin-bottom: 3px; /* 添加一个底部间距 */
}

.uploaded-image img {
  width: 95%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}
.uploaded-image div.overlay {
  pointer-events: auto;
}
/*.overlay {*/
/*  position: absolute;*/
/*  bottom: 5px;*/
/*  right: 5px;*/
/*  display: flex;*/
/*}*/
.overlay {
  position: absolute;
  right: 5%;
  bottom: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  height:35px;
  z-index: 3;
  cursor: pointer;
}

.delete-button {
  color: white;
  margin-right: 14px;;
  font-size: 16px;
  cursor: pointer;
}
.el-button {
  background-color: #00C5CD;
  color: white;

}

</style>
