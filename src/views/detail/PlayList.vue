<template>
  <transition name="first">
    <div>
      <play-top :introduce="playTopMessage"></play-top>
      <div class="song-list-title" @click="playAll" v-if="songList.length>0">
        <img src="~assets/img/larkcloud_play.svg" alt="">
        <h4>播放全部({{songList.length}})</h4>
      </div>
      <scroll :top="200" :list="songList" class="play-list-scroll">
        <song-list :songList="songList"></song-list>
      </scroll>
    </div>
  </transition>
</template>

<script>
  import SongList from 'components/commom/SongList.vue'
  import PlayTop from './PlayTop'
  import Scroll from 'components/commom/Scroll.vue'

  import {mapActions, mapMutations, mapGetters} from 'vuex'

  export default {
    name: 'PlayList',
    data() {
      return {
        playListId: null,
        playTopMessage: {},
        songList: []
      }
    },
    components: {
      PlayTop,
      SongList,
      Scroll
    },
    methods: {
      async getPlayList() {
        const res = await this.$https.get('/playlist/detail?id=' + this.playListId)
        const playList = res.data.playlist
        this.playTopMessage = {
          img: playList.coverImgUrl,
          name: playList.name,
          playCount: playList.playCount,
          tags: playList.tags
        }
        this.songList = playList.tracks
        // console.log(this.playTopMessage)
        // console.log(this.songList)
        // console.log(res)
      },
      playAll() {        
        if(this.playList.length != 0){
          this.$dialog.confirm({
            title: '播放列表',
            message: '当前播放列表将会被替换，是否确定？',
            confirmButtonColor: 'orangered'
          }).then(() => {
            // on confirm
            this.selectPlay(this.songList)
            this.setCurrentIndex(0)
            this.setMode(1)
          }).catch(() => {
              // on cancel
          });
        }else {
          this.selectPlay(this.songList)
          this.setCurrentIndex(0)
          this.setMode(1)
        }
      },
      ...mapActions([
        'selectPlay'
      ]),
      ...mapMutations({
        'setCurrentIndex': 'SET_CURRENT_INDEX',
        'setMode': 'SET_MODE'
      })
    },
    computed: {
      ...mapGetters([
        'playList'
      ])
    },
    created() {
      this.playListId = this.$route.params.playListId
      this.getPlayList()
    }
  }
</script>

<style scoped>
  .play-list-scroll {
    height: calc(100vh - 200px);
  }
</style>