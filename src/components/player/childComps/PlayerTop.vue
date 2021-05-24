<template>
  <div class="player-top">
    <div class="play-top-info">
      <div class="play-top-info-left">
        <img src="~assets/img/drop_down.svg" @click="back">
      </div>
      <div class="play-top-info-center">
        <h4>{{playTopInfo.name}}</h4>
        <p>{{(playTopInfo.artist || []) | artists}}</p>
      </div>
    </div>
    <div class="play-img">
      <img :src="playTopInfo.img" :class="playing ? 'animation-running' : 'animation-pause'" class="animation-play">
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'PlayerTop',
    props: {
      playTopInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      back() {
        this.setFullScreen(false)
      },
      ...mapMutations({
        'setFullScreen': 'SET_FULL_SCREEN'
      })
    },
    computed: {
      ...mapGetters([
        'playing'
      ])
    },
    filters: {
      artists(arts) {
        let names = '';
        for(let i = 0; i< arts.length; i++) {
          if(i+1 != arts.length) {
            names = names + arts[i].name + '/'
          }else {
            names = names + arts[i].name
          }
        }
        return names
      }
    }
  }
</script>

<style scoped>
  .play-top {
    width: 100vw;
  }

  .play-top-info {
    width: 100%;
    height: 60px;
    display: flex;
    text-align: center;
  }

  .play-top-info img {
    width: 25px;
    height: 25px;
    margin-top: 10px;
  }

  .play-top-info-left {
    width: 50px;
    text-align: center;
  }

  .play-top-info-left img {
    width: 20px;
    height: 20px;
  }

  .play-top-info-center {
    width: calc(100% - 100px);
  }

  .play-top-info-center h4,p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .play-top-info-center h4 {
    font-size: 18px;
    line-height: 30px;
  }

  .play-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 10px auto;
  }

  .play-img img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: block;
    border: 30px solid #000;
  }

  
</style>