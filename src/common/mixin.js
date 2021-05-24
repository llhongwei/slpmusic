export const transition = {
  data() {
    return {
      transitionName: ''
    }
  },
  beforeRouteLeave (to, from, next) {
    // console.log(to.meta.index, from.meta.index)
    if(to.meta.index > from.meta.index) {
      this.transitionName = 'first'
    }else {
      this.transitionName = 'second'
    }
    // console.log(this.transitionName)
    setTimeout(() => {
      next()
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  },  
}
