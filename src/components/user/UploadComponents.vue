<template>
  <div>
    <el-upload
        ref="upload"
        action="/front/fileInfo/uploadImage"
        list-type="picture-card"
        :class="{ hide_box: upload_btn, 'custom-upload': true }"
        accept="image/*"
        :before-remove="beforeRemove"
        :before-upload="beforeUpload"
        :on-preview="handlePictureCardPreview"
        :on-success="handleSuccess"
        :on-error="handleError"
    >
      <img v-if="imageUrl" :src="imageUrl" class="image"/>
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-dialog v-model="dialogVisible" style="width:90%">
      <img style="width:100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, nextTick, defineProps, onMounted,watch} from 'vue';
import { ElMessageBox, ElMessage } from "element-plus";
import {defineEmits, getCurrentInstance, provide} from "@vue/runtime-core";
import {Plus} from "@element-plus/icons-vue"
const imageUrl=ref('');
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const upload_btn = ref(false);
const responseData = ref(null);

const handlePictureCardPreview = (file) => {
  nextTick(() => {
    dialogImageUrl.value = file.url;
    console.log(file.url)
  });
  dialogVisible.value=true
};
const beforeUpload = (file) => {
  if (upload_btn.value) {
    return false;
  }
  upload_btn.value = true;
  return true;
};

const beforeRemove = () => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm("此操作将删除该图片, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
        .then(() => {
          resolve();
          upload_btn.value = false;
          responseData.value = null;
          imageUrl.value=null;
        })
        .catch(() => {
          reject(false);
        });
  });
};
const emit = defineEmits(['upload-success']);
const handleSuccess = (response, file, fileList) => {
  // imageUrl.value=file.url
  upload_btn.value = false;
  responseData.value = response; // 存储后端传回的数据
  // imageUrl.value=null
  fileList.splice(fileList.indexOf(file), 1); // 从fileList数组中移除已上传的文件
  console.log(response);
  if(response.code!==200){
    const index = fileList.indexOf(file);
    if (index > -1) {
      fileList.splice(index, 1);
    }
    upload_btn.value = false;
    responseData.value = null; // 清空后端传回的数据
    ElMessage.error("上传失败")
    return
  }
  emit('upload-success', responseData);
};

const handleError = (err, file, fileList) => {
  upload_btn.value = false; // 将 upload_btn 设置为 false，以便显示上传文件按钮
  responseData.value = null; // 清空后端传回的数据
  ElMessage.error("上传失败，请重试！"); // 显示错误提示信息
};


</script>

<style scoped>
::v-deep .hide_box .el-upload--picture-card {
  display: none;

}
::v-deep .el-upload__tip {
  display: none;
}

.image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

::v-deep .el-upload--picture-card {
  width: 90vw;
  height:  50vw;
}
::v-deep .el-upload {
  width: 90vw;
  height:  50vw;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item {
  width: 90vw;
  height:  50vw;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 90vw;
  height:  50vw;
}
::v-deep .avatar {
  width: 90vw;
  height:  50vw;
}
</style>