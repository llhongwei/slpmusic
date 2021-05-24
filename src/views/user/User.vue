<template>
  <transition :name="transitionName">
    <div>
      <login v-if="!isLogin"/>
      <user-main v-else/>
    </div>
  </transition>
</template>

<script>
  import Login from './childComps/Login.vue'
  import UserMain from './childComps/UserMain.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'User',
    data() {
      return {
        transitionName: 'first'
      }
    },
    components: {
      Login,
      UserMain
    },
    computed: {
      ...mapGetters([
        'isLogin'
      ])
    },
    beforeRouteLeave (to, from, next) {
      // console.log(from.meta.index, to.meta.index)
      if(to.meta.index === 4) {
        this.transitionName = 'second'
      } else {
        this.transitionName = 'first'
      }
      // console.log(this.transitionName)
      setTimeout(() => {
        next()
      })
    }
  }
</script>

<style>

</style>