import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import checkClass from './modules/checkClass'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    checkClassInfo: {
      name: '',
      year: '',
      season: '',
      teacher: '',
      students: 0,
      id: 0
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    checkClass
  },
  plugins: [
    createPersistedState({
      // 存储方式：localStorage、sessionStorage、cookies  默认: localStorage
      storage: window.sessionStorage,
            // 存储的 key 的key值
      key: "store",
      render(state) {
                // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
        return { ...state };
      }
      })
  ]
})
