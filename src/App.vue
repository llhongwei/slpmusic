<template>
  <div id="app">
    <keep-alive exclude="PlayList,Artist">
      <router-view class="route"></router-view>
    </keep-alive>
    <player></player>   
  </div>
</template>
<script>
  import Player from './components/player/Player.vue'
  import {mapMutations} from 'vuex'

  export default {
    components: { 
      Player
    },
    data() {
      return {
        transitionName: ''
      }
    },
    methods: {
      async isLogin() {
        try {
          const res = await this.$https.get('/login/status')
          if(res.data.code === 200) {
            this.setUserId(res.data.profile.userId)
            this.setIsLogin(true)
          }
        } catch (e) {

        }
      },
      ...mapMutations({
        'setUserId': 'SET_USERID' ,
        'setIsLogin': 'SET_IS_LOGIN'
      })
    },
    mounted() {
      this.isLogin()
    }
  }
</script>
<style>
  @import "assets/css/style.css";

  .route {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
</style>
