<template>
  <scroll class="curr-scroll" :list="playList" ref="currscroll">
    <ul>
      <li v-for="(item, index) in playList" :key="index" class="curr-item" @click="playThis(index)">
        <div class="item-box">
          <p>
            <span class="item-song-name">{{item.name}}</span>
            <span>-</span>
            <span class="item-artist-name">{{item.ar | artists}}</span>
          </p>
        </div>
      </li>
    </ul>
  </scroll>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Scroll from '../../commom/Scroll.vue';
  
  export default {
  components: { Scroll },
    name: 'CurrPlayList',
    computed: {
      ...mapGetters([
        'playList'
      ])
    },
    methods: {
      playThis(index) {
        this.addAndPlaySong(index)
      },
      ...mapActions([
        'addAndPlaySong'
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
  .curr-scroll {
    position: relative;
    height: 406px;
  }

  .curr-item {
    width: 100%;
    height: 50px;
  }

  .item-box {
    line-height: 50px;
  }

  .item-box p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-song-name {
    font-size: 16px;
    padding-right: 4px;
    font-weight: 500;
  }

  .item-artist-name {
    font-size: 10px;
    padding-left: 4px;
    font-weight: 100;
  }
</style>