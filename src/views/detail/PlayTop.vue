<template>
  <div class="paly-top" :style="'background-color:' + color[selectColor]">
    <div class="play-top-back">
      <img src="~assets/img/back-arrow.svg" alt="" @click="back">
    </div>
    <div :style="{'background-image': 'url(' + introduce.img + ')'}" class="top-left">
      <div>
        <img src="~assets/img/music.svg" alt="">
        <span>{{introduce.playCount | playsFilter}}</span>
      </div>
    </div>
    <div class="top-right">
      <h4>{{introduce.name}}</h4>
      <div>
        <span v-for="(item, index) in introduce.tags" :key="index">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PlayTop',
    data() {
      return {
        color: [
                'rgb(252, 228, 244)',
                'rgb(228, 232, 252)',
                'rgb(228, 252, 232)',
                'rgb(252, 228, 229)',
                'rgb(252, 242, 228)',
                'rgb(235, 228, 252)'
        ],
        selectColor: 0
      }
    },
    props: {
      introduce: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    },
    filters: {
      playsFilter(value) {
        if (value < 1000) {
          return value
        } else {
          return (value/10000).toFixed(1) + '万'
        }
      }
    },
    mounted() {
      this.selectColor = Math.floor(Math.random() * 6)
    }
  }
</script>

<style scoped>
  .paly-top {
    width: 100%;
    height: 150px;
  }

  .play-top-back {
    width: 100%;
    height: 30px;
  }

  .play-top-back img {
    width: 40px;
    padding-left: 15px;
  }

  .top-left {
    position: absolute;
    width: 90px;
    height: 90px;
    top: 30px;
    z-index: 99;
    background-size: 90px 90px;
    margin-left: 30px;
    color: #fff;
    font-size: 10px;
  }

  .top-left div {    
    background-color: rgb(87, 86, 86, .4);
  }

  .top-left img{
    padding-top: 2px;
    width: 12px;
    height: 12px;
  }

  .top-right {
    color: #fff;
    width: 200px;
    height: 90px;
    margin-left: 150px;
  }

  .top-right h4 {
    padding-top: 10px;
  }

  .top-right div {
   margin-top: 15px;
  }

  .top-right span{
    font-size: 14px;
  }
</style>