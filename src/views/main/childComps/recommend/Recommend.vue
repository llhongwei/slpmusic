<template>
  <transition :name="transitionName">
    <div class="recommend">
      <scroll  
        :list="recommendList"  
        :pullUpLoad="true"
        @pullingUp="pullingUp"
        ref="scroll"
        class="main-scroll">
        <swiper :banners="banners"></swiper>
        <recommend-list 
          :recommendList="recommendList"
        />
        <p class="tips" v-show="recommendList.length">{{ tips }}</p>
        <div class="loading-container" v-show="!recommendList.length">
          <van-loading type="spinner" color="orangered" size="24px">加载中...</van-loading>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
  import Scroll from '../../../../components/commom/Scroll.vue'
  import RecommendList from './RecommendList.vue'
  import Swiper from './Swiper.vue'
  import {transition} from 'common/mixin'

  export default {
    name: 'Recommend',
    data() {
      return {
        banners: [],
        recommendList: [],
        limit: 20,
        tips: '上拉加载'
      }
    },
    mixins: [transition],
    methods: {
      //获取轮播图数据
      async getRecommendBanner() {
        const res = await this.$https.get('banner?type=1')
        this.banners = res.data.banners
        // console.log(this.banners)
      },
      //获取推荐列表数据
      async getRecommendList() {
        const res = await this.$https.get('/personalized?limit=' + this.limit)
        this.recommendList = res.data.result.map(item => ({
          id: item.id,
          name: item.name,
          copywriter: item.copywriter,
          img: item.picUrl
        }))
        this.limit += 20
        // console.log(this.limit)
        // console.log(this.recommendList)
      },
      pullingUp() {
        // console.log(this.limit + '---' + (this.recommendList.length + 21))
        if(this.limit === (this.recommendList.length + 20)) {
          this.getRecommendList()
          this.$refs.scroll.finishPullUp()
        }else {
          this.tips = '已经到底了'
        }
      }
    },
    components: { 
      RecommendList, 
      Scroll,
      Swiper,
      // RecommendBanner,
    },
    created() {
      this.getRecommendList()
      this.getRecommendBanner()
      // console.log('created')
    }
  }
</script>

<style socped>
 
</style>