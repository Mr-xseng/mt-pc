const state = () => ({
  menuList: [],
  hotPlace: []
})

const mutations = {
  setMenu (state,menu) {
    state.menuList = menu
  },
  setHotplace (state,hotList) {
    state.hotPlace = hotList
  }
}

const actions = {
  setMenu: ({commit},menuList) => {
    commit('setMenu',menuList)
  },
  setHotplace: ({commit},hotList) => {
    commit('setHotplace',hotList)
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}
