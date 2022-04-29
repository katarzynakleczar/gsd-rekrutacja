import Vue from 'vue'
import Vuex from 'vuex'
import organizations from './modules/organizations'
import users from './modules/users'
import repos from './modules/repos'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      test: 'Testowy string'
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
      organizations,
      users,
      repos
  }
})