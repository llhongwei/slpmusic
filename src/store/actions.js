import * as types from './mutations-types'

export const selectPlay = function ({commit, state}, list) {
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_PLAYING, true)
}

export const addAndPlaySong = function ({commit, state}, index) {
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING, true)
}