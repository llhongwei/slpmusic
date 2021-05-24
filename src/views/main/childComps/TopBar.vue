<template>
  <div class="main-top-bar">
    <div class="main-title">
      <div class="main-user" @click="goToUser">
        <img src="~assets/img/user.svg">
      </div>
      <div class="main-name">
        <h3>Slp Music</h3>
      </div>
    </div>
    <div class="titles">
      <div 
        v-for="(item, index) in titles"
        :key="index"
        class="titles-item"
        @click="titleClick(index)"
        :class="{'is-active': index === currentIndex}">
        {{ item.title }}
      </div>
    </div>
    <div class="border" ref="border" :style="`transform: translate(${currentIndex * 100}%)`"></div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      titles: [
        { title: '推荐', path: 'recommend' },
        { title: '歌手', path: 'singer' },
        { title: '排行', path: 'rank' },
        { title: '搜索', path: 'search' }
      ],
      currentIndex: 0
    }
  },
  methods: {
    goToUser() {
      this.$router.push('/User')
    },
    titleClick(index) {
      if(index != this.currentIndex) {
        this.$refs.border.style.transfrom = `translateX(${this.currentIndex * 100}%)`
        this.currentIndex = index
        this.$router.push(this.titles[index].path)
      }
    }
  },
  mounted() {
    this.currentIndex = this.$route.meta.index 
  }
}
</script>

<style scoped>
  .main-top-bar {
    position: relative;
    z-index: 999;
  }

  .main-title {
    display: flex;
    background-color: orangered;
    color: #fff;
    height: 40px;
    width: 100vw;
  }

  .main-user img {
    width: 40px;
    height: 40px;
    padding: 8px;
  }

  .main-name {
    width: calc(100% - 80px);
    text-align: center;
    line-height: 40px;
  }

  .titles {
    display: flex;
    background-color: #fff;
  }

  .titles-item {
    flex: 1;
    text-align: center;
    padding: 15px 15px 13px;
    transition: color 0s ease-in-out .15s;
  }

  .border {
    width: 25%;
    height: 2px;
    background-color: orangered;
    transition: transform .15s ease-in-out;
  }

  .is-active {
    color: orangered;
  }
</style>