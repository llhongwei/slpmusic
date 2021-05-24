<template>
  <div>
    <!-- <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <img :src="item.pic">
      </swiper-item>
    </swiper> -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <img :src="item.pic" class="swipe-img">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
// import {Swiper, SwiperItem} from 'components/swiper/index'

export default {
  name: 'HomeSwiper',
  // components: {
  //   SwiperItem,
  //   Swiper
  // },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scpoed>
  /* .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  } */
  .swipe-img {
    height: 150px;
    width: 100vw;
  }
</style>