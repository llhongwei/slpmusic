export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const atIndex = state => state.atIndex

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}

export const userId = state => state.userId

export const isLogin = state => state.isLogin