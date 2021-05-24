<template>
  <div class="artist-top" :style="{'background-image': 'url(' + artistMessage.img + ')'}">
    <div class="artist-top-back">
      <img src="~assets/img/back-arrow.svg" @click="back">
    </div>
    <div class="artist-message">
      <span>{{artistMessage.name}}</span>
      <div class="artist-brief">
        <p>{{artistMessage.briefDesc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArtistTop',
    props: {
      artistMessage: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .artist-top {
    width: 100%;
    height: 200px;
    background-size: 100%;
  }

  .artist-top-back {
    width: 100%;
    height: 30px;
  }

  .artist-top-back img {
    width: 40px;
    padding-left: 15px;
  }

  .artist-message {
    color: #fff;
    font-family: '微软雅黑';
    margin: 100px 30px 0;
    bottom: 30px;
  }

  .artist-message span {
    font-size: 22px;
  }

  .artist-brief {
    width: 80%;
    height: 50px;
  }

  .artist-brief p {
    width: 100%;
    font-size: 14px;
    padding-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>