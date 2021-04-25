import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialogArr: []
  },
  mutations: {
    addDialog(state, dialog) {
      state.dialogArr.push(dialog)
    },
    leave(state, room) {
      for (let i in state.dialogArr) {
        if (state.dialogArr[i].room === room) {
          state.dialogArr[i].isOnline = false
          return
        }
      }
    },
    selectChecked(state, room) {
      for (let i in state.dialogArr) {
        if (state.dialogArr[i].room === room) {
          state.dialogArr[i].isChecked = true
          return
        }
      }
    },
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
