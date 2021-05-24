<template>
  <transition :name="transitionName">
    <div>
      <scroll :list="searchList" :pullUpLoad="true" @pullingUp="pullingUp" ref="scroll" class="main-scroll">
        <div class="search">
          <search-box 
            :hotKeyWord="hotKeyWord" 
            @searchClick="search"
            ref="searchs"></search-box>
          <search-hots 
            :hotKeyWord="hotKeyWord" 
            @searchClick="search" 
            v-if="searchList.length === 0"></search-hots>
          <search-list 
            v-else
            :list="searchList"
            :tips="tips"></search-list>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
  import SearchBox from './childComps/SearchBox'
  import SearchList from './childComps/SearchList'
  import SearchHots from './childComps/SearchHots'

  import Scroll from 'components/commom/Scroll.vue'
  import {transition} from 'common/mixin'

  export default {
    name: 'Search',
    data() {
      return {
        hotKeyWord: [],
        searchList: [],
        limit: 20,
        tips: '上拉加载',
        keyWord: null
      }
    },
    components: {
      SearchBox,
      SearchList,
      SearchHots,
      Scroll
    },
    mixins: [transition],
    methods: {
      async gethotKeyWord() {
        const res = await this.$https.get('/search/hot');
        this.hotKeyWord = res.data.result.hots;
        // console.log(this.hotKeyWord)
      },
      async getSearchList(keyWord) {
        const res = await this.$https.get('/search?keywords=' + keyWord + '&limit=' + this.limit)
        // console.log(res)
        this.searchList = res.data.result.songs.map(item => {
          return {
            id: item.id,
            name: item.name,
            ar: item.artists,
            album: item.album.name
          }
        })
        // console.log(this.limit)
        this.limit += 20
      },
      search(keyWord) {
        this.limit = 20;
        this.getSearchList(keyWord)
        this.keyWord = keyWord
        this.$refs.searchs.keyWord = keyWord
        this.tips = '上拉加载'
        this.$refs.scroll.finishPullUp()
        // console.log(this.searchList)
      },
      pullingUp() {
        if(this.limit <= 100) {
          this.getSearchList(this.keyWord)
          this.$refs.scroll.finishPullUp()
        }else {
          this.tips = '已经到底了'
        }
      }
    },
    created() {
      this.gethotKeyWord()
    }
  }
</script>

<style>

</style>