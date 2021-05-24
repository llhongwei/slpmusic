<template>
  <div class="singer-type">
    <div v-for="(value, key) in singerCategory" :key="key" class="singer-category">
      <div v-for="(item, index) in value" :key="index" class="singer-category-value">
        <span :class="{ 'active-item': activeIndex[key] == index }" @click="singerCategoryClick(key, index)">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingerCategory',
  data() {
    return {
      singerCategory: {
        type: [
          { name: '全部', num: -1 },
          { name: '男歌手', num: 1 },
          { name: '女歌手', num: 2 },
          { name: '乐队', num: 3 }
        ],
        area: [
          { name: '全部', num: -1 },
          { name: '华语', num: 7 },
          { name: '欧美', num: 96 },
          { name: '日本', num: 8 },
          { name: '韩国', num: 16 },
          { name: '其他', num: 0 }
        ]
      },
      activeIndex: {
        type: 0,
        area: 0
      }
    }
  },
  methods: {
    singerCategoryClick(key, index) {
      this.activeIndex[key] = index
      this.$emit('singerSwitch', this.singerCategory['type'][this.activeIndex['type']].num, this.singerCategory['area'][this.activeIndex['area']].num);
    }
  }
}
</script>

<style scoped>
  .singer-category {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    margin-top: 10px;
  }

  .singer-category-value {
    padding: 10px 0 10px 20px;
  }

  .singer-category-value span {
    padding: 5px 5px;
    border-radius: 5px;
  }

  .active-item {
    background-color: orangered;
    color: #fff;
  }
</style>