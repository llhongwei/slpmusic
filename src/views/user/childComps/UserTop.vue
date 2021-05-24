<template>
  <div>
    <div class="user-topbar">
      <img src="~assets/img/backbl.svg" @click="back">
      <h4>{{userMessage.nickname}}</h4>
      <img src="~assets/img/gengduo.svg" @click="showLogout" class="more">
      <transition name="logout">        
        <div class="logout" v-show="isShowLogout" @click="logout">退出登录</div>
      </transition>
      <div v-show="isShowLogout" class="bgceng" @click="hiddenLogout"></div>
    </div>
    <div class="user-top">
      <div>
        <img :src="userMessage.avatarUrl">
      </div>
      <div class="user-top-fans">
        <div>
          <h4>{{userMessage.followeds}}</h4>
          <p>粉丝</p>
        </div>
        <div>
          <h4>{{userMessage.follows}}</h4>
          <p>关注</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    namr: 'UserTop',
    data() {
      return {
        isShowLogout: false
      }
    },
    props: {
      userMessage: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      showLogout() {
        this.isShowLogout = true
      },
      hiddenLogout() {
        this.isShowLogout = false
      },
      async logout() {
        try {
          const res = await this.$https.get(`/logout`)
          if(res.data.code === 200) {
            this.setIsLogin(false)
            this.$toast.success({
              message: '登出成功',
              duration: 500,
            })
          }  
        } catch (error) {
          this.$toast.fail({
              message: '登出失败',
              duration: 500,
          })    
        }   
      },
      ...mapMutations({
        'setIsLogin': 'SET_IS_LOGIN'
      })
    }
  }
</script>

<style scoped>
  .user-topbar {
    display: flex;
    width: 100vw;
    border-bottom: 1px solid #000;
  }
  .user-topbar img {
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .user-topbar h4{
    display: block;
    width: calc(100% - 100px);
    height: 50px;
    line-height: 50px;
    position: relative;
  }

  .user-top {
    display: flex;
    align-items: center;
    width: 80vw;
    margin: 10px auto;
    padding: 1.5em .5em;
    background-color: #fff;
    border-radius: 1.5em;
  }
  .user-top img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 50px 0 30px;
  }

  .user-top-fans {
    display: flex;
    text-align: center;
    font-size: 12px;
  }
  .user-top-fans div {
    margin-right: 20px;
    width: 30px;
  }

  .more {
    position: relative;
  }

  .logout {
    width: 8em;
    height: 2.5em;
    text-align: center;
    line-height: 2.5em;
    background-color: #fff;
    position: absolute;    
    top: 40px;
    right: 0px;
    box-shadow: -3px 3px 3px #f1f1f1;
    border-radius: .5em;
    z-index: 999;
  }

  .bgceng {
    width: 100vw;
    height: 100vh;

    position: fixed;
  }

  .logout-enter-active, .logout-leave-active {
    transition-property: opacity;
    transition-duration: .3s;
    transition-timing-function: ease-in;
  }

  .logout-enter, .logout-leave-to {
    opacity: 0;
  }
</style>