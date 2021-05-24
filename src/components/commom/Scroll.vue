<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    data() {
      return {
        scroll: {}
      }
    }, 
    props: {
      list: {
        type: Array,
        required: true
      },
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      //创建BScroll对象
      createScroll() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          mouseWheel: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        })
        //监听滚动
        if(this.probeType === 2 || this.probeType === 3) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos.y);
          })
        }
        //监听上拉事件
        if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp'); 
        }) 
      }
        // console.log(this.scroll)
      },
      //BScroll刷新方法
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        setTimeout(() => {
          this.scroll && this.scroll.finishPullUp()
        }, 1000);
      },
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      }
    },
    mounted() {
      this.createScroll()
    },
    watch: {
      list() {
        this.$nextTick(function () {
          this.refresh()
        });
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }
</style>
