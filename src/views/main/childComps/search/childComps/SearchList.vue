<template>
  <div class="search-list">
    <h4>搜索列表</h4>
    <div  
      class="search-list-item"
      v-for="item in list"
      :key="item.id"
      >
      <div class="search-list-item-detail" @click="addAndPlay(item)">
        <p class="search-item-name">{{item.name}}</p>
        <p class="search-item-album">{{item.ar | artists}}{{'-' + item.album}}</p>
      </div>
      <div class="add-song" @click="addSong(item)">
          <span>+</span>
      </div>
    </div>
    <p class="tips">{{tips}}</p>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'

  export default {
    name: 'SearchList',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      tips: {
        type: String,
        default: '正在加载'
      }
    },
    methods: {
      addAndPlay(item) {
        this.addPlaySong(item)
        if(this.atIndex === -1) {
          this.addAndPlaySong(this.currentIndex + 1)
        } else {
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
        }
      },
      addSong(item) {
        this.addPlaySong(item)
        // console.log(this.atIndex)
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
            duration: 500})
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
        'currentSong'
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
  }
</script>

<style scoped>
  .search-list {
    width: 100vw;
    margin: 30px auto 10px;
    color: rgb(68, 68, 68);
    font-size: 16px;
  }

  .search-list h4 {
    width: 100%;
    font-size: 16px;
    color: #000;
    padding: 0 20px 5px;
    border-bottom: 1px solid rgb(202, 202, 202);
  }

  .search-list-item {
    padding: 3px 0;
    border-bottom: 1px solid rgb(202, 202, 202);
    display: flex;
  }

  .search-list-item-detail {
    width: calc(100% - 50px);
  }

  .search-list-item-detail p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search-item-name {
    padding: 5px 20px 3px;
  }

  .search-item-album {
    font-size: 12px;
    padding: 3px 20px 5px;
    color: rgb(146, 145, 145);
  }

  .add-song {
    width: 50px;
    font-size: 30px;
    text-align: center;
    line-height: 50px;
    color: #919090;
  }
</style>