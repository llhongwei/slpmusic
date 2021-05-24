<template>
  <div class="audio-player">
    <div class="percentage">
      <div class="percentage-current">
        <span>{{current}}</span>
      </div>
      <div class="percentage-main">
        <van-slider 
          v-model="newTime" 
          :max="duration" 
          button-size="10" 
          active-color="'orangered'" 
          @input="changeTime" 
          @change="changeTime"/>
      </div>
      <div class="percentage-alltime">
        <span>{{alltime}}</span>
      </div>
    </div>
    <div class="control-player">
      <div @click="changeMode">
        <img src="~assets/img/loop.svg" v-if="mode === 1">
        <img src="~assets/img/random.svg" v-else-if="mode === 2">
        <img src="~assets/img/onlyone.svg" v-else>
      </div>
      <div @click="preSong">
        <img src="~assets/img/Rew.svg">
      </div>
      <div @click="changePlaying">
        <img src="~assets/img/pausef.svg" v-if="playing">
        <img src="~assets/img/runf.svg" v-else>
      </div>
      <div @click="nextSong">
        <img src="~assets/img/ffw.svg">
      </div>
      <div @click="openShow">
        <img src="~assets/img/stream_listf.svg">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'AudioPlayer',
    data() {
      return {
        newTime: 0
      }
    },
    props: {
      currentTime: {
        type: Number,
        default: 0
      },
      duration: {
        type: Number,
        default: 0
      }
    },
    methods: {
      changeMode() {
        let m = 0
        if(this.mode === 1){
          m =2
        }else if(this.mode === 2){
          m = 3
        }else {
          m = 1
        }
        this.sedMode(m)
      },
      preSong() {
        if(this.mode === 1){
          if(this.currentIndex === 0){
            this.sedCurrentIndex(this.playList.length - 1)
          }else {
            this.sedCurrentIndex(this.currentIndex-1)
          }
        }else if(this.mode === 2){
          const m = Math.floor(Math.random() * this.playList.length);
          this.sedCurrentIndex(m)
        }else {
          if(this.currentIndex === 0){
            this.sedCurrentIndex(this.playList.length - 1)
          }else {
            this.sedCurrentIndex(this.currentIndex-1)
          }
        }
        this.sedPlaying(true)
      },
      changePlaying() {
        this.$emit('change')
      },
      nextSong() {
        if(this.mode === 1){
          if(this.currentIndex === (this.playList.length - 1)){
            this.sedCurrentIndex(0)
          }else {
            this.sedCurrentIndex(this.currentIndex+1)
          }
        }else if(this.mode === 2){
          const m = Math.floor(Math.random() * this.playList.length);
          this.sedCurrentIndex(m)
        }else {
          if(this.currentIndex === (this.playList.length - 1)){
            this.sedCurrentIndex(0)
          }else {
            this.sedCurrentIndex(this.currentIndex+1)
          }
        }
        this.sedPlaying(true)
      },
      openShow() {
        this.$emit('openShow');
      },
      changeTime() {
        this.$emit('changeTime', this.newTime);
      },
      ...mapMutations({
        'sedPlaying': 'SET_PLAYING',
        'sedMode': 'SET_MODE',
        'sedCurrentIndex': 'SET_CURRENT_INDEX',
      })
    },
    computed: {
      current() {
        const time = parseInt(this.currentTime)
        let f = parseInt(time/60)
        let m = time - f * 60
        if(f<10)
          f = '0' + f
        if(m<10)
          m = '0' + m
        return f + ":" + m
      },
      alltime() {
        const time = parseInt(this.duration)
        let f = parseInt(time/60)
        let m = time - f * 60
        if(f<10)
          f = '0' + f
        if(m<10)
          m = '0' + m
        return f + ":" + m
      },
      ...mapGetters([
        'playing',
        'mode',
        'currentIndex',
        'playList'
      ])
    },
    watch: {
      currentTime() {
        this.newTime = this.currentTime
      }
    }
  }
</script>

<style scoped>
  .audio-player {
    width: 100vw;
    position: absolute;
    top: calc((100vh - 600px)/2 + 534px);
    left: 0;
    right: 0;
  }

  .percentage {
    width: 100vw;
    display: flex;
    height: 30px;
  }

  .percentage-current, .percentage-alltime {
    width: 50px;
    line-height: 30px;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }

  .percentage-main {
    width: calc(100% - 100px);
    margin-top: 14px;
  }

  .control-player {
    display: flex;
  }

  .control-player div {
    width: 20%;
    text-align: center;
  }
</style>