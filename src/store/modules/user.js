// import { login, getUserInfo, logout } from '@/api/modules/user'
import { setToken, removeToken } from '@/utils/auth'
// import axios from 'axios'
// import { Message } from 'element-ui'

const getDefaultState = () => {
  return {
    name: '',
    avatar: '',
    phone: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      setToken('token')
      resolve()
      //   login(username.trim(), password)
      //     .then(response => {
      //       const { data } = response
      //       if (data) {
      //         axios.defaults.headers.common['access-token'] = data.data
      //         setToken(data.data)
      //         resolve()
      //       } else {
      //         Message({
      //           message: '用户名或密码错误.',
      //           type: 'error',
      //           duration: 3 * 1000
      //         })
      //         reject(response)
      //       }
      //     })
      //     .catch(error => {
      //       reject(error)
      // })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        username: 'user',
        avatar: 'avatar',
        phone: 'phone'
      }
      commit('SET_NAME', data.username)
      commit('SET_AVATAR', data.avatar)
      commit('SET_PHONE', data.phone)
      resolve(data)
      // getUserInfo(state.token)
      //   .then(response => {
      //     const { data } = response.data
      //     commit('SET_NAME', data.username)
      //     commit('SET_AVATAR', data.avatar)
      //     commit('SET_PHONE', data.phone)
      //     resolve(data)
      //   })
      //   .catch(error => {
      //     reject(error)
      //   })
    })
  },

  // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token)
  //       .then(() => {
  //         removeToken() // must remove  token  first
  //         commit('RESET_STATE')
  //         resolve()
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
