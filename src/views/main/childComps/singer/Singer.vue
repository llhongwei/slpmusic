<template>
  <transition :name="transitionName">
    <div>
      <scroll :list="singerList" :pullUpLoad="true" ref="scroll" @pullingUp="pullingUp" class="main-scroll">
        <singer-category @singerSwitch="getSingers"/>
        <singer-list :singerList="singerList"/>
        <p class="tips" v-show="singerList.length">{{ tips }}</p>
        <div class="loading-container" v-show="!singerList.length">
          <van-loading type="spinner" color="orangered" size="24px">加载中...</van-loading>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
  import Scroll from '../../../../components/commom/Scroll.vue'
  import SingerCategory from './childComps/SingerCategory.vue'
  import SingerList from './childComps/SingerList.vue'
  import {transition} from 'common/mixin'
  export default {
    name: 'Singer',
    data() {
      return {
        type: -1,
        area: -1,
        singerList: [],
        limit: 20,
        tips: '上拉加载'
      }
    },
    mixins: [transition],
    components: {
      SingerCategory,
        SingerList,
        Scroll
    },
    methods: {
      getSingers(type, area) {
        if(this.type != type || this.area != area) {
          this.type = type
          this.area = area
          this.limit = 20
          this.singerList = []
          this.getSingerList()
        }        
      }, 
      async getSingerList() {
        const res = await this.$https.get('/artist/list?type=' + this.type + '&area=' + this.area + '&limit=' + this.limit)
        this.singerList = res.data.artists
        // console.log(this.singerList)
        this.limit += 20
      },
      pullingUp() {
        if(this.singerList.length < 100) {
          this.getSingerList()
          this.$refs.scroll.finishPullUp()
        }else {
          this.tips = '已经到底了'
        }
      }
    },
    created() {
      this.getSingerList()
    }    
  }
</script>

<style scpoed>
  
</style>