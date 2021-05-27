<template>
  <div v-show="playList.length>0" class="player">
    <transition name="fullplayer">
      <div class="full-player" v-show="fullScreen">
        <player-top :playTopInfo="songInfo"/>
        <lyric 
          :lyricInfo="lyric" 
          :currentTime="currentTime" 
          ref="lyric"
          />
        <audio :src="songUrl" 
          autoplay
          ref="player" 
          @timeupdate="getCurrentTime" 
          @loadedmetadata="getDuration"
          @ended="nextSong"/>
        <audio-player 
          :currentTime="currentTime" 
          :duration="duration"
          @change="changePlaying"
          @openShow="openShowList"
          @changeTime="changeTime"/>
      </div>
    </transition>
    <transition name="minplayer">
      <div class="min-player" v-show="!fullScreen">
        <div class="min-player-main" @click="toFullScreen">
          <div class="min-player-img">
            <img :src="songInfo.img" :class="playing ? 'animation-running' : 'animation-pause'" class="animation-play">
          </div>
          <div class="min-player-name">
            <span class="min-player-name-song">{{songInfo.name}}</span>
            <span>-</span>
            <span class="min-player-name-artist">{{(songInfo.artist || []) | artists}}</span>
          </div>
        </div>
        <div class="min-player-anniu" @click="changePlaying">
          <img src="~assets/img/pause.svg" v-if="playing">
          <img src="~assets/img/run.svg" v-else>
        </div>
        <div class="min-player-list" @click="openShowList">
          <img src="~assets/img/stream_list.svg">
        </div>
      </div>
    </transition>
    <play-and-his :showList="showList" @closeShow="closeShowList"></play-and-his>
  </div>
</template>

<script>
  import Lyric from './childComps/Lyric.vue'
  import PlayerTop from './childComps/PlayerTop.vue'
  import AudioPlayer from './childComps/AudioPlayer.vue'
  import PlayAndHis from './childComps/PlayAndHis.vue'
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'


  export default {
    name: 'Player',
    data() {
      return {
        songId: 0,
        songUrl:null,
        songInfo: {},
        lyric: [],
        err: {},
        currentTime: 0,
        duration: 0,
        showList: false
      }
    },
    components: {
      PlayerTop,
      Lyric,
      AudioPlayer,
      PlayAndHis
    },
    methods: {
      getCurrentTime () {
        try {
           this.currentTime = Math.floor((this.$refs.player.currentTime * 100)) / 100
        // console.log(this.currentTime)
        } catch (error) {
          this.err = error
        }
      },
      getDuration() {
        //获取总时长
        this.duration = Math.floor((this.$refs.player.duration * 100)) / 100
        // console.log(this.duration)
      },
      async getSongUrl() {
        try {
          const res = await this.$https.get('/song/url?id=' + this.songId)
          // console.log(res)
          this.songUrl = res.data.data[0].url
          this.$refs.player.load()
          // console.log(this.songUrl)
        } catch (error) {
           
        }
      },
      async getSongInfo() {
        try {
          const res = await this.$https.get('/song/detail?ids=' + this.songId)
          this.songInfo = {
            name: res.data.songs[0].name,
            img: res.data.songs[0].al.picUrl,
            artist: res.data.songs[0].ar
          }
          // console.log(this.songInfo)
        } catch (error) {
          
        }
      },
      async getLyric() {
        this.lyric = []
        const res = await this.$https.get('/lyric?id=' + this.songId)
        // console.log(res)
        let lyrics = [];
        if( 'lrc' in res.data) {
          lyrics = res.data.lrc.lyric.split("\n")
        }
        const reg = /\[\d*:\d*(\.|:)\d*]/g
        for(let i = 0; i < lyrics.length; i++) {
          let timeRegExpArr = lyrics[i].match(reg)
          if(!timeRegExpArr) continue;
          const time = timeRegExpArr[0]
          //取出分
          let min = Number(time.match(/\[\d*/i).toString().slice(1))
          //取出秒
          let sec = Number(time.match(/:\d*\.\d*/i).toString().slice(1))
          //歌词文本
          let content = lyrics[i].replace(timeRegExpArr, "")

          const secs = Math.floor((min * 60 + sec) * 100) /100 

          const lyr = {
            time: secs,
            text: content
          }
          this.lyric.push(lyr)
        }
      },
      toFullScreen() {
        this.setFullScreen(true)
      },
      changePlaying() {
        this.sedPlaying(!this.playing)
        if(this.playing) {
          if(this.currentIndex === -1) {
            this.sedCurrentIndex(0)
          }
          this.$refs.player.play()
        }else {
          this.$refs.player.pause()
        }
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
        }
      },
      openShowList() {
        this.showList = true
      },
      closeShowList() {
        this.showList = false
      },
      changeTime(newTime) {
        this.$refs.player.currentTime = newTime
      },
      ...mapMutations({
        'setSequenceList': 'SET_SEQUENCE_LIST',
        'setFullScreen': 'SET_FULL_SCREEN',
        'sedPlaying': 'SET_PLAYING',
        'sedCurrentIndex': 'SET_CURRENT_INDEX',
      })
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'mode',
        'currentIndex'
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
    },
    watch: {
      currentSong() {
        // console.log(this.currentSong)
        this.$nextTick(() => {
          if(this.currentIndex != -1) {
          this.songId = this.currentSong.id
          this.getSongUrl()
          this.getSongInfo()
          this.getLyric()
          this.setSequenceList(this.currentSong)
        } 
        });
      }
    },
    created() {
      this.$nextTick(() => {
        if(this.currentIndex != -1) {
        this.songId = this.currentSong.id
        this.getSongUrl()
        this.getSongInfo()
        this.getLyric()
        this.setSequenceList(this.currentSong)
        this.sedPlaying(true)
      }
      });
    }
  }
</script>

<style scoped>
  .full-player {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: rgb(46, 33, 33);
    color: #fff;
  }

  .min-player {
    width: 100vw;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #fff;
    z-index: 100;
    border-top: 1px solid rgb(224, 243, 253);
  }

  .min-player-main {
    width: calc(100% - 100px);
    display: flex;
  }

  .min-player-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: -5px 0 0 20px;
  }

  .min-player-img img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: block;
    border: 6px solid #000;
  }

  .min-player-name {
    color: #000;
    margin-left: 10px;
    line-height: 50px;
  }

  .min-player-name-song {
    font-size: 16px;
    padding-right: 4px;
    font-weight: 500;
  }

  .min-player-name-artist {
    font-size: 8px;
    padding-left: 4px;
    font-weight: 100;
  }

  .min-player-anniu, .min-player-list {
    width: 50px;
    margin-top: 10px;
    text-align: center;
  }

  .fullplayer-enter-active {
    transition-property: opacity, transform;
    transition-duration: .4s;
    transition-timing-function: ease;
    transition-delay: .2s;
  }

  .fullplayer-leave-active {
    transition-property: opacity, transform;
    transition-duration: .3s;
    transition-timing-function: ease;
  }

  .fullplayer-enter, .fullplayer-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }

  .minplayer-enter-active {
    transition-property: opacity, transform;
    transition-duration: .3s;
    transition-timing-function: ease;
    transition-delay: .3s;
  }

  .minplayer-leave-active {
    transition-property: opacity, transform;
    transition-duration: .2s;
    transition-timing-function: ease;
  }

  .minplayer-enter, .minplayer-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
</style>