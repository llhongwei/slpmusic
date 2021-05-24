<template>
  <div>
    <scroll :list="lyricInfo" v-show="lyricInfo.length != 0" ref="scroll" class="lyric-scroll">
      <ul class="lyric">
          <li v-for="(item, index) in lyricInfo" :key="index" class="lyric-item" ref="lyricItem" :class="{'is-sing': index === currentIndex}">{{item.text}}</li>
      </ul>
    </scroll>
    <div v-show="lyricInfo.length === 0" class="no-lyric">无歌词</div>
  </div>
</template>

<script>
  import Scroll from 'components/commom/Scroll'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Lyric',
    components: { 
      Scroll 
    },
    data() {
      return {
        currentIndex: 0,
        err: {}
      }
    },
    props: {
      lyricInfo: {
        type: Array,
        default() {
          return []
        }
      },
      currentTime: {
        type: Number,
        default: 0
      }
    },
    computed: {
      ...mapGetters([
        'fullScreen'
      ])
    },
    watch: {
      currentTime() {
        try {
          for(let i = 0; i < this.lyricInfo.length; i++) {
            if(this.currentTime >= this.lyricInfo[i].time && this.currentTime < this.lyricInfo[i+1].time) {
              this.$refs.scroll.scrollTo(0, -i*24, 500)
              this.currentIndex = i             
            }
          }
        } catch (error) {
          
        }
      },
      currentIndex() {
        if(this.currentIndex <= 5) {
          this.$refs.scroll.refresh()
        }
      },
      fullScreen() {
        if(this.fullScreen) {
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 200);
        }
      }
    }
  }
</script>

<style scoped>
  .lyric-scroll {
    height: 264px;
  }

  .lyric {
    font-size: 14px;
    text-align: center;
    padding: 120px 0;
  }

  .lyric-item {
    display: block;
    height: 24px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .is-sing {
    color: orangered;
    font-size: 16px;
  }

  .no-lyric {
    text-align: center;
    position: relative;
    top: 50px;
  }
</style>