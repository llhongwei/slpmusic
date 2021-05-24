<template>
  <transition :name="transitionName">
    <scroll :list="rankList" class="main-scroll" ref="scroll">
      <div class="rank">
        <router-link v-for="rank in rankList" :key="rank.id" class="rank-list" tag="div" :to="'/playlist/' + rank.id">
          <div class="rank-list-item">
            <div v-lazy:background-image="rank.img" class="rank-item-main">
              <span>{{rank.updateFrequency}}</span>
            </div>
            <p>{{rank.name}}</p>
          </div>
        </router-link>
      </div>
      <div class="loading-container" v-show="!rankList.length">
        <van-loading type="spinner" color="orangered" size="24px">加载中...</van-loading>
      </div>
    </scroll>
  </transition>
</template>

<script>
  import Scroll from 'components/commom/Scroll.vue'
  import {transition} from 'common/mixin'

  export default {
  components: { Scroll },
    name: 'Rank',
    data() {
      return {
        rankList: []
      }
    },
    mixins: [transition],
    methods: {
      async getRankList() {
        const rankRes = await this.$https.get(`/toplist`)
        // console.log(rankRes)
        this.rankList = rankRes.data.list.map(item => {
          return {
            id: item.id,
            img: item.coverImgUrl,
            name: item.name,
            updateFrequency: item.updateFrequency
          }
        })
        // console.log(this.rankList)  
      }
    },
    created() {
      this.getRankList()
    }
  }
</script>

<style scoped>
  .rank {
    width: 100%;
    padding-bottom: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .rank:after {
    contain: "";
    height: 0;
    width: 33%;
  }

  .rank-list {
    width: 33%;
    height: 150px;
  }

  .rank-list-item {
    margin: 10px 10px;
    font-size: 14px;
  }

  .rank-item-main {
    width: 100px;
    height: 100px;
    background-size: contain;
    border-radius: 10px;
    position: relative;
  }

  .rank-item-main span {
    position: absolute;
    right: 5px;
    top: 3px;
    font-size: 10px;
    color: #fff;
  }
</style>