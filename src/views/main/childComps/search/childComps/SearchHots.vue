<template>
  <div class="search-hots">
    <h3>热搜榜</h3>
    <div class="hot-list">
      <div 
        v-for="(item, index) in hotKeyWord" 
        :key="index" class="hot-list-item" 
        @click="searchClick(item.first)">
        <span class="hot-num">{{(index + 1)}}</span>
        <p class="hot-names">{{item.first}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchHots',
    props: {
      hotKeyWord: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      searchClick(keyWord) {
        this.$emit('searchClick', keyWord);
      }
    }
  }
</script>

<style scoped>
  .search-hots {
    margin: 30px 0 0 0;
    width: 100%;
  }

  .search-hots h3 {
    width: 80%;
    display: block;
    margin: 0 auto;
    font-size: 16px;
    color: #000;
    padding: 20px;
    border-bottom: 1px solid rgb(202, 202, 202);
  }

  .hot-list {
    display: flex;
    width: 80%;
    margin: 20px auto;
    flex-wrap: wrap;
    color: rgb(107, 107, 107);
    font-size: 16px;
  }

  .hot-list-item {
    width: 50%;
    height: 30px;
    line-height: 30px;
    display: flex;
  }

  .hot-list-item .hot-num {
    color: red;
    display: inline-block;
    width: 25px;
    padding-right: 10px;
  }

  .hot-list-item .hot-names {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>