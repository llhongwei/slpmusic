import * as types from './mutations-types'
import state from './state'

const mutations = {
  [types.SET_SINGER] (state, singer){
    state.singer = singer
  },
  [types.SET_PLAYING] (state, flag){
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag){
    state.fullScreen = flag
  },
  [types.SET_PLAY_LIST] (state, list){
    state.playList = list
    // console.log(state.playList)
  },
  [types.SET_SEQUENCE_LIST] (state, song){
    let isIn = false
    for(let i = 0; i < state.sequenceList.length; i++){
      if(song.id === state.sequenceList[i].id) {
        for(let j = i; j > 0; j--) {
          state.sequenceList[j] = state.sequenceList[j-1]
        }
        state.sequenceList[0] = song
        isIn = true
        break
      }
    }
    if(!isIn) {
      state.sequenceList.unshift(song)
    }
  },
  [types.SET_MODE] (state, mode){
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index){
    state.currentIndex = index
  },
  [types.SET_AT_INDEX] (state, index){
    state.atIndex = index
  },
  [types.ADD_PLAY_SONG] (state, song) {
    let isIn = false
    let index = -1
    if(state.playList.length > 0) {
      for(let i = 0; i < state.playList.length; i++) {
        if(song.id === state.playList[i].id) {
          index = i
          isIn = true
          break
        }
      }
      if(!isIn) {
        state.playList.splice(state.currentIndex+1, 0, song)
      }
    }else {
      state.playList.push(song)
    }
    // console.log(index)
    
    state.atIndex = index 
    // console.log(state.atIndex)   
  },
  [types.SET_USERID] (state, id) {
    state.userId = id
  },
  [types.SET_IS_LOGIN] (state, login) {
    state.isLogin = login
  }
}

export default mutations