export const state = () => ({
  auth: {
    token: null,
    refresh_token: null
  },

  user: {
    iat: null,
    exp: null,
    roles: {},
    username: null
  }
})

export const getters = {
  user: state => state.user,
  token: state => state.token,
  layout: state => state.layout
}

export const mutations = {
  SET_TOKEN(state, auth) {
    const { token, refresh_token } = auth

    state.auth = {
      token: token,
      refresh_token: refresh_token
    }
  },

  DELETE_TOKEN(state) {
    state.auth = {
      token: null,
      refresh_token: null
    }
  },

  SET_USER(state, value) {
    state.user = {
      iat: value.iat,
      exp: value.exp,
      roles: value.roles,
      username: value.username
    }
  }
}
export const actions = {
  nuxtServerInit({ commit }) {
    const { $cookies } = this
    const token = $cookies.get('token')
    const refresh_token = $cookies.get('refresh_token')

    if (token && refresh_token) {
      commit('SET_TOKEN', { token, refresh_token })
    }
  }
}
