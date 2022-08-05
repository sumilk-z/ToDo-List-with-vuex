import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有任务列表
    list: [],
    // 文本框的内容
    inputValue: '',
    // 下一个ID
    nextId: 5,
    // 按钮的类型： all 表示全部  done表示已完成  todo表示未完成
    viewKey: 'all'
  },
  mutations: {
    initList(state, val) {
      state.list = val
    },
    setInputValue(state, val) {
      state.inputValue = val
    },
    addItem(state) {
      const obj = {
        id: state.nextId,
        done: false,
        info: state.inputValue
      }
      state.list.push(obj)
      state.nextId++
    },
    changeStatusById(state, param) {
      // done: param.val id: param.id
      const i = state.list.findIndex((item) => item.id === param.id)
      state.list[i].done = param.val
    },
    removeById(state, id) {
      // 删除对应的数据
      const i = state.list.findIndex((item) => item.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    cleanDone(state) {
      // 清除所有done为true的数据
      state.list = state.list.filter((item) => !item.done)
    },
    changeViewKey(state, key) {
      // 改变ViewKey的值：all done notDone
      state.viewKey = key
    }
  },
  actions: {
    // 请求数据，异步动作，放到actions中
    getList(context) {
      axios.get('/data.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  modules: {},
  getters: {
    notDoneCount(state) {
      return state.list.filter((item) => !item.done).length
    },
    getListByKey(state) {
      // 根据类型返回数据
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'done') {
        return state.list.filter((item) => item.done)
      }
      if (state.viewKey === 'notDone') {
        return state.list.filter((item) => !item.done)
      }
      // 返回默认选项
      return state.list
    }
  }
})
