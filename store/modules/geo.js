const state = () => ({
  position: {},
  newPosition:{}
})
const mutations = {
  setPosition(state, position) {
    state.position = position
  },
  setNewPosition(state,NewPosition) {
    state.newPosition = NewPosition
  }
}
const actions = {
  setPosition:({commit},position) => {
    commit('setPosition',position)
  },
  setNewPosition:({commit},NewPosition) => {
    commit('setNewPosition',NewPosition)
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}
