import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有会话
    dialogArr: []
  },
  mutations: {
    addDialog(state, dialog) {
      state.dialogArr.push(dialog)
    },
    // 根据room将指定会话置为离开状态
    leave(state, room) {
      for (let i in state.dialogArr) {
        if (state.dialogArr[i].room === room) {
          state.dialogArr[i].isOnline = false
          return
        }
      }
    },
    // 根据room将指定会话置为选中状态
    selectChecked(state, room) {
      for (let i in state.dialogArr) {
        if (state.dialogArr[i].room === room) {
          state.dialogArr[i].isChecked = true
          return
        }
      }
    },
    // 所有会话取消选中
    cancelChecked(state) {
      for (let i in state.dialogArr) {
        state.dialogArr[i].isChecked = false
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
