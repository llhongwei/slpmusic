<template>
  <div  class="search-box">
    <input type="search" :placeholder="defaultKey" v-model="keyWord">
    <img src="~assets/img/search.svg" @click="searchClick">
  </div>
</template>

<script>
  export default {
    name: 'SearchBox',
    data() {
      return {
        keyWord: null,
        defaultKey: null,
      }
    },
    props: {
      hotKeyWord: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      searchClick() {
        if(this.keyWord === null || this.keyWord === '') {
          this.keyWord = this.defaultKey
        }
        this.$emit('searchClick', this.keyWord);
        this.getKeyWord()
        // console.log(this.keyWord)
      },
      getKeyWord() {
        const num = Math.floor(Math.random() * 10)
        this.defaultKey = this.hotKeyWord[num].first
      }
    },
    watch: {
      hotKeyWord() {
        this.$nextTick(function () {
          this.getKeyWord()
        })
      }
    }
  }
</script>

<style scoped>
  .search-box {
    width: 70%;
    height: 32px;
    margin: 10px 15%;
    border-bottom: 1px solid orangered;
    display: flex;
  }

  .search-box input {
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    padding-left: 20px;
  }

  .search-box img {
    width: 30px;
  }
</style>