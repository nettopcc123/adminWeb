 // 测试demo
import { getSysAdmin } from '@/api/system'

const user = {
  state: {
    code: '01'
  },

  mutations: {
    SET_SYSADMIN: (state, code) => {
      state.code = code
    }
  },

  actions: {
    // 获取用户信息
    GetSysAdmin({ commit, state }) {
      return new Promise((resolve, reject) => {
        getSysAdmin(state.code).then(response => {
           console.log(state.code)
           commit('SET_SYSADMIN', 'c01')  // 测试demo数据
          // 由于mockjs 不支持自定义状态码只能这样hack
          if (!response.data) {
            reject('Verification failed, please login again.')
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
