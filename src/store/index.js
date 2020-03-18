import Vuex from 'vuex'
import Vue from "vue";
import test from "./test"

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    test
  },
  // state: {
  //   count: 0
  // },
  // getters: {  // getters
  //   countAdd: function (state) {
  //     return state.count++
  //   },
  // },
  // mutations: {
  //   inc(state, n) {
  //     state.count += n;
  //   },
  //   dec: state => state.count--
  // },
  // actions: {
  //   incAsync ({ commit }) {
  //     setTimeout(() => {
  //       commit('inc')
  //     }, 1000)
  //   }
  // },
  //待添加
});
export default store
