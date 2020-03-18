const test = {
  state: {
    count: 0,
  },
  getters: {  // getters
    countAdd: function (state) {
      return state.count++
    },
  },
  mutations: {
    inc(state, n) {
      state.count += n;
    },
    dec: state => state.count--
  },
  actions: {
    incAsync ({ commit }) {
      setTimeout(() => {
        commit('inc')
      }, 1000)
    }
  },
}

export default test
