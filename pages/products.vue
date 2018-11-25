<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <categroy
        :types="types"
        :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        ref="amap"
        :width="230"
        :height="290"
        :point="point"
      />
    </el-col>
  </el-row>

</template>

<script>
  import Crumbs from '../components/products/crumbs.vue'
  import Categroy from '../components/products/categroy.vue'
  import List from '../components/products/list.vue'
  import Amap from '../components/public/map.vue'
  const scrollHeight = 351
  const ElementHeight = 214
  const SCROLL_TOP = 227
  export default {
    components:{
      Crumbs,
      Categroy,
      List,
      Amap
    },
    data(){
      return {
        list:[],
        types:[],
        areas:[],
        keyword:'',
        point:[],
        pointArr:[]
      }
    },
    mounted(){
      this.$store.commit('geo/setProduct',this.list)
      window.addEventListener('scroll',this.MapScroll)
    },
    methods:{
      MapScroll () {
        let scrollTop = document.documentElement.scrollTop
        let currentIndex
        // window.console.log(scrollTop,SCROLL_TOP)
        if (scrollTop >= SCROLL_TOP) {
          this.$refs.amap.onScroll()
        } else {
          this.$refs.amap.moveScroll()
        }
        if (scrollHeight < scrollTop) {
          let newHeight = scrollTop - scrollHeight
          currentIndex = Math.round(newHeight / ElementHeight)
        } else {
          currentIndex = 0
        }
        this.point = this.pointArr.filter((item,index) => index === currentIndex)[0].point
        // window.console.log(currentPoint)
      }
    },
    async asyncData(ctx){
      //public/header/searchBox.vue 传来keyword
      let keyword = ctx.query.keyword
      let city = ctx.store.state.geo.position.city
      //根据keyword获取相应的产品的列表
      let {status,data:{count,pois}} = await ctx.$axios.get('/search/resultsByKeywords',{
        params:{
          keyword,
          city
        }
      })
      //根据所在城市获取区域以及区域的热门产品
      let {status:status2,data:{areas,types}} = await ctx.$axios.get('/categroy/crumbs',{
        params:{
          city
        }
      })
      if(status===200&&count>0&&status2===200){
        return {
          //遍历筛选过滤
          list: pois.filter(item=>item.photos.length).map(item=>{
            return {
              type: item.type,
              img: item.photos[0].url,
              name: item.name,
              comment: Math.floor(Math.random()*10000),
              rate: Number(item.biz_ext.rating),
              price: Number(item.biz_ext.cost),
              scene: item.tag,
              tel: item.tel,
              status: '可订明日',
              module: item.type.split(';')[0]
            }
          }),
          keyword,
          pointArr:pois.map(item => {
            return {
              point:item.location.split(',')
            }
          }),
          areas: areas.filter(item=>item.type!=='').slice(0,5),
          types: types.filter(item=>item.type!=='').slice(0,5),
          point: (pois.find(item=>item.location).location||'').split(',')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import ".././assets/css/products/index.scss";
</style>
