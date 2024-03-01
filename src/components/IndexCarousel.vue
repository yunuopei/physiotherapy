<script setup>
import {onMounted, ref} from "vue";
import {Swiper,SwiperSlide} from "swiper/vue";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination} from 'swiper/modules';
import axios from "axios";
import Show1 from '../assets/show1.jpg'
import Show2 from '../assets/show2.jpg'
import Show3 from '../assets/show3.jpg'


const images = ref()
const flag = ref(false)
const modules = [Autoplay,Pagination]
onMounted(async () => {
  images.value = [Show1,Show2,Show3]
  // await axios.get('/system/carouselItem/show')
  //     .then(response => {
  //       if (response.data.rows.length !== 0){
  //         images.value = response.data.rows
  //         flag.value = true
  //       }else {
  //         images.value = [Show1,Show2,Show3]
  //       }
  //
  //     }).catch(error => {
  //       console.error(error)
  //     })
})
</script>
<template>
  <swiper
      :modules="modules"
      :initialSlide="initialSlide"
      :centeredSlides="true"
      :autoplay="{
      delay: 3000,

    }"
      :pagination="{ clickable: true }"

  >
    <swiper-slide class="swiper-slide-show" v-for="image in images" v-if="flag">
      <a :href="image.url">
        <img class="image-show" :src="`/front/fileInfo/downloadFile/${image.image}`">
      </a>
    </swiper-slide>
    <swiper-slide class="swiper-slide-show" v-for="image in images" v-if="!flag">
      <a>
        <img class="image-show" :src="`${image}`">
      </a>
    </swiper-slide>
  </swiper>
</template>
<style>


.image-show{
  width: 100%;
  height: 200px;
  border-radius: 6px;
}
</style>
