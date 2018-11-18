import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'


Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules:{
    geo,
    home
  },
  actions:{
    async nuxtServerInit({commit},{req,app}){
      const {status,data:{province,city}} =
      await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition',status === 200 ? {province,city} : {province: '',city:''})
      const {status:status1,data} = await app.$axios.get('/geo/getMenu')
      commit('home/setMenu',status1 === 200 ? {menu:data.menu} : {menu: []})
      const {status:status2,data:{result}} = await app.$axios.get('/search/hotPlace',{
        params:{
          city: app.store.state.geo.position.city.replace('市','')
        }
      })
      // console.log(result)
      app.store.commit('home/setHotPlace',status2 === 200 ? result : [])
    }
  }
})

export default store
