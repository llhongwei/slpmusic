<template>
  <transition name="second">
    <div id="main">
      <top-bar/>
      <keep-alive exclude="Search">
        <router-view class="main-route"></router-view>
      </keep-alive>
    </div>
  </transition>
</template>

<script>
import TopBar from './childComps/TopBar.vue'
  
  export default {
    name: 'Mian',
    components: { 
      TopBar,
    }
  }
</script>

<style scoped>
  .main-route {
    height: calc(100vh - 90px);
  }
</style>