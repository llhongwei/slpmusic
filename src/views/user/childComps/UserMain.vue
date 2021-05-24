<template>
  <div class="user-main">
    <user-top :userMessage="userMessage"/>
    <recommend-list :recommendList="userPlaylist"/>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
import RecommendList from '../../main/childComps/recommend/RecommendList.vue'
import UserTop from './UserTop.vue'

  export default {
    name: 'UserMain',
    data() {
      return {
        userMessage: {},
        userPlaylist: []
      }
    },
    components: {
        UserTop,
        RecommendList

    },
    methods: {
      async getUserMessage() {
        const res = await this.$https.get(`/user/detail?uid=${this.userId}`)
        this.userMessage = res.data.profile
      },
      async getUserPlaylist() {
        const res = await this.$https.get(`/user/playlist?uid=${this.userId}`)
        this.userPlaylist = res.data.playlist.map(item => ({
          id: item.id,
          name: item.name,
          copywriter: item.trackCount + '首',
          img: item.coverImgUrl
        }))
      },
    },
    computed: {
      ...mapGetters([
        'userId'
      ])
    },
    created() {
      this.getUserMessage()
      this.getUserPlaylist()
    }
  }
</script>

<style scoped>
  .user-main {
    background-color: #f8f7f7;
    min-height: 100vh;
  }
</style>