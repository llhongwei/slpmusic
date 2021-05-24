<template>
  <div>
    <div class="login-top">
      <div class="login-back" @click="back">
        <img src="~assets/img/back.svg">
      </div>
      <div class="login-title">
        <h3>登录</h3>
      </div>
    </div>
    <div class="login-form">
      <input type="text" placeholder="请输入手机号码" v-model="phoneNum">
      <input type="password" placeholder="请输入密码" v-model="passWord">
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: 'Login',
    data() {
      return {
        phoneNum: null,
        passWord: null
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      async login() {
        this.$toast.loading({
          message: '登录中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        try {
          const res = await this.$https.post(`/login/cellphone?phone=${this.phoneNum}&password=${this.passWord}&timestamp=${new Date().getTime()}`)
          // console.log(res)
          const code = res.data.code
          if(code === 200) {
            this.$toast.success('登陆成功')
            this.setUserId(res.data.account.id)
            this.setIsLogin(true)
          }else {
            this.$toast.fail(res.data.msg + '！')
          }
        } catch (error) {
          console.log(error)
          this.$toast.fail('登陆失败')
        }
      },
      ...mapMutations({
        'setUserId': 'SET_USERID' ,
        'setIsLogin': 'SET_IS_LOGIN'
      })
    }

  }
</script>

<style scoped>
  .login-top {
    background-color: orangered;
    display: flex;
    color: #fff;
    height: 40px;
    width: 100vw;
    line-height: 40px;
  }

  .login-back img {
    width: 40px;
    height: 40px;
    padding: 8px;
  }

  .login-title {
    width: calc(100% - 80px);
    text-align: center;
  }

  .login-form {
    width: 80vw;
    margin: 80px 10vw;
  }

  .login-form input {
    font-size: 16px;
    width: 100%;
    padding: 10px 30px;
    margin-bottom: 20px;
    border: 1px solid orangered;
    border-radius: 18px;
  }

  .login-form button {
    display: block;
    padding: 10px 80px;
    background-color: orangered;
    color: #fff;
    border: none;
    border-radius: 2px;
    margin: 10px auto;
    letter-spacing: 10px;
  }
</style>