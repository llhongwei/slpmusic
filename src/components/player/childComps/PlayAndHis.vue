<template>
  <div>
    <transition name="bgc">
      <div class="bgc" v-if="showList" @click="closeShow"></div>
    </transition>
    <transition name="phlist">
      <div class="play-and-his" v-if="showList">
        <van-tabs v-model="activeName" swipeable :color="'orangered'" animated class="van-tabs">
          <van-tab title="播放列表" name="list">
            <curr-play-list/>
          </van-tab>
          <van-tab title="播放历史" name="history">
            <play-histroy/>
          </van-tab>
        </van-tabs>
        <div class="close-show" @click="closeShow">
          <img src="~assets/img/updata.svg" alt="">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import CurrPlayList from './CurrPlayList'
  import PlayHistroy from './PlayHistroy'

  export default {
    name: 'PlayAndHis',
    data() {
      return {
        activeName: 'list'
      }
    },
    props: {
      showList: {
        type: Boolean,
        default: false
      }
    },
    components: {
      CurrPlayList,
      PlayHistroy
    },
    methods: {
      closeShow() {
        this.$emit('closeShow');
      }
    }
  }
</script>

<style scoped>
  .bgc {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 150;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(179, 178, 178, .3);
  }

  .play-and-his {
    position: fixed;
    z-index: 200;
    background-color: #fff;
    height: 450px;
    width: 80%;
    bottom: 30px;
    left: 10%;
    right: 10%;
  }

  .close-show {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    right: 5px;
  }

  .close-show img {
    width: 20px;
    height: 20px;
  }

  .phlist-enter-active, .phlist-leave-active {
    transition-property: opacity, transform;
    transition-duration: .5s;
    transition-timing-function: ease;
  }

  .phlist-enter, .phlist-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }

  .bgc-enter-active, .bgc-leave-active {
    transition: opacity .5s initial;
  }

  .bgc-enter, .bgc-leave-to {
    opacity: 0;
  }
</style>