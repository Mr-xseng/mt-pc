const state = () => ({
  position: {},
  productList:[]
})
const mutations = {
  setPosition(state, position) {
    state.position = position
  },
  setProduct (state,list) {
    state.productList = list
  }
}
const actions = {
  setPosition:({commit},position) => {
    commit('setPosition',position)
  },
  setProduct: ({commit},list) => {
    commit('setProduct',list)
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}
