<template>
  <div class="singer-list">
    <router-link 
      class="singer-item" 
      v-for="item in singerList" 
      :key="item.id"
      :to="'/artist/' + item.id"
      @click="setSinger(item)">
      <img v-lazy="item.img1v1Url" alt="">
      <span>{{ item.name }}</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'SingerList',
    props: {
      singerList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .singer-list {
    margin-top: 30px;
  }

  .singer-item {
    /* padding: 10px 0 15px 30px; */
    height: 60px;
    display: flex;
    border-bottom: 1px solid #f6f6f6;
    margin: 5px 30px 15px;
  }

  .singer-item img {
    width: 60px;
    height: 60px;
    display: inline-block;
    border-radius: 50%;
  }

  .singer-item span {
    padding-left: 20px;
    padding-top: 20px;
  }
</style>