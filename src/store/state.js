import { playMode } from 'common/play-mode'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.loop,
  currentIndex: -1,
  atIndex: -1,
  isLogin: false,
  userId: null
}

export default state