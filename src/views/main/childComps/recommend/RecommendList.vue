<template>
  <div class="recommend-list">
    <router-link 
      v-for="item in recommendList"
      :key="item.id"
      class="recommend-list-item"
      tag="div"
      :to="'/playlist/' + item.id">
      <img v-lazy="item.img">
      <div class="item-info">
        <p class="otws">{{ item.name }}</p>
        <p class="otws">{{ item.copywriter }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'RecommendList',
    props: {
      recommendList: {
        type: Array,
        default() {
          return []
        }
      },      
    }
  }
</script>

<style scoped>
  .recommend-list {
    padding: 5px 15px;
    font-size: 14px;
    margin: 5px 0 20px;
  }

  .recommend-list-item {
    display: flex;
    padding: 5px 0;
  }

  .recommend-list-item img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }

  .recommend-list-item .item-info {
    width: calc(100vw - 90px);
    padding-left: 15px;
    padding-top: 10px;
    line-height: 25px;
  }

  .recommend-list-item .item-info p:first-child {
    color:rgb(27, 26, 26);
  }

  .recommend-list-item .item-info p:last-child {
    color: rgb(155, 154, 154);
  }
</style>