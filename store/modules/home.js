const state = () => ({
  menuList: [],
  hotPlace: []
})

const mutations = {
  setMenu (state,menu) {
    state.menuList = menu
  },
  setHotPlace (state,hotList) {
    state.hotPlace = hotList
  }
}

const actions = {
  setMenu: ({commit},menuList) => {
    commit('setMenu',menuList)
  },
  setHotPlace: ({commit},hotList) => {
    commit('setHotPlace',hotList)
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}
