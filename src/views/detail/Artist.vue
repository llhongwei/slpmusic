<template>
  <transition name="first">
    <div>
      <artist-top :artistMessage="artistTop"></artist-top>
      <div class="song-list-title" @click="playAll" v-if="artistSongs.length > 0">
        <img src="~assets/img/larkcloud_play.svg" alt="">
        <h4>播放全部({{artistSongs.length}})</h4>
      </div>
      <scroll :top="250" :list="artistSongs" class="artist-scroll">
        <song-list :songList="artistSongs"></song-list>
      </scroll>
    </div>
  </transition>
</template>

<script>
  import Scroll from '../../components/commom/Scroll.vue'
  import SongList from '../../components/commom/SongList.vue'
  import ArtistTop from './ArtistTop.vue'

  import {mapActions, mapMutations, mapGetters} from 'vuex'

  export default {
    name: 'Artist',
    data() {
      return {
        artistId: null,
        artistTop: {},
        artistSongs: []
      }
    },
    components: { 
      ArtistTop,
      SongList,
      Scroll,
    },
    methods: {
      async getArtistsMessage() {
        const res = await this.$https.get('/artists?id=' + this.artistId)
        const artist = res.data.artist
        // console.log(res)
        this.artistTop = {
          img: artist.picUrl,
          name: artist.name,
          briefDesc: artist.briefDesc
        }
        this.artistSongs = res.data.hotSongs
      },
      playAll() {
        if(this.playList.length != 0){
          this.$dialog.confirm({
            title: '播放列表',
            message: '当前播放列表将会被替换，是否确定？',
            confirmButtonColor: 'orangered'
          }).then(() => {
            // on confirm
            this.selectPlay(this.artistSongs)
            this.setCurrentIndex(0)
            this.setMode(1)
          }).catch(() => {
              // on cancel
          });
        }else {
          this.selectPlay(this.artistSongs)
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
      this.artistId = this.$route.params.artistId
      this.getArtistsMessage()
    }
  }
</script>

<style scoped>
  .artist-scroll {
    height: calc(100vh - 250px);
  }
</style>