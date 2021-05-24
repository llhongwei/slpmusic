<template>
  <div>
    <div class="song-list">
      <div
        v-for="(item, index) in songList" 
        :key="item.id" 
        class="song-list-item">
        <div class="song-list-num">{{index +1}}</div>
        <div class="song-list-item-detail"  @click="addAndPlay(item)">
          <h4>{{item.name}}</h4>
          <p>
            <span>{{item.ar | artists}}</span>
            <span>{{item.al.name}}</span>
          </p>
        </div>
        <div class="add-song" @click="addSong(item)">
          <span>+</span>
        </div>
      </div>
    </div>
    <div class="loading-container" v-show="!songList.length">
        <van-loading type="spinner" color="orangered" size="24px">加载中...</van-loading>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'

  export default {
    name: 'SongList',
    props: {
      songList: {
        type: Array,
        default() {
          return []
        } 
      }
    },
    methods: {
      addAndPlay(item) {
        this.addPlaySong(item)
        if(this.atIndex === -1) {
          this.addAndPlaySong(this.currentIndex + 1)
        } else {         
          this.addAndPlaySong(this.atIndex)
          this.setAtIndex(-1)          
        }
      },
      addSong(item) {
        this.addPlaySong(item)
        if(this.atIndex != -1) {
          this.$dialog.confirm({
            title: item.name,
            message: '在播放列表中已存在，是否播放？',
            confirmButtonColor: 'orangered'
          }).then(() => {
            // on confirm
            this.addAndPlaySong(this.atIndex)
            this.setAtIndex(-1)
          }).catch(() => {
              // on cancel
              this.setAtIndex(-1)
          });
        }else {
          this.$toast.success({
            message: '添加成功',
            duration: 500,
          })
        }
      },
      ...mapMutations({
        'addPlaySong': 'ADD_PLAY_SONG',
        'setAtIndex': 'SET_AT_INDEX'
      }),
      ...mapActions([
        'addAndPlaySong'
      ])
    },
    computed: {
      ...mapGetters([
        'currentIndex',
        'atIndex',
        'currentSong',
        'playing'
      ])
    },
    filters: {
      artists(art) {
        let names = '';
        for(let i = 0; i< art.length; i++) {
          if(i+1 != art.length) {
            names = names + art[i].name + '/'
          }else {
            names = names + art[i].name
          }
        }
        return names
      }
    }
  }
</script>

<style scoped>

  .song-list {
    width: 100vw;
    padding-bottom: 50px;
  }

  .song-list-item {
    width: 100vw;
    display: flex;
    flex-wrap: nowrap;
    height: 50px;
  }

  .song-list-num {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
  }

  .song-list div:nth-child(n+2) .song-list-item-detail {
    border-top: 1px solid #f4f4f4;
  }

  .song-list-item-detail {
    width: calc(100% - 100px);
    padding-top: 8px;
  }

  .song-list-item-detail h4,p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .song-list-item-detail h4 {
    font-size: 16px;
  }

  .song-list-item-detail p {
    font-size: 14px;
    padding-top: 3px;
    color: #919090;
  }

  .add-song {
    width: 50px;
    font-size: 30px;
    text-align: center;
    line-height: 50px;
    color: #919090;
  }
  
</style>