<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择:</dt>
      <dd
        v-for="item in list"
        :key="item">
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      v-for="item in block"
      :key="item.title"
      class="m-categroy-section"
    >
      <dt :id="'city-' + item.title">{{ item.title }}</dt>
      <dd>
        <span
          v-for="c in item.city"
          :key="c"
        >{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>
<script>
import axios from 'axios'
import pyjs from 'js-pinyin'
export default {
  data () {
    return {
      list:'ABCDEFGHJKLMNPQRSTWXYZ'.split(''),
      block:[]
    }
  },
  async mounted () {
    let blocks = []
    let self = this
    let {status,data:{city}} = await axios.get('/geo/city')
    if (status === 200) {
      let c
      let d = {}
      let p
      city.forEach(item => {
        c = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1)
        p = c.charCodeAt(0)
        if (p>96&&p<123) {
          if (!d[c]) {
            d[c] = []
          }
          d[c].push(item.name)
        }
      })
      for(let [k,v] of Object.entries(d)) {
        blocks.push({
          title:k.toUpperCase(),
          city:v
        })
      }
      blocks.sort((a,b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      self.block = blocks
    }
  }
}
</script>
<style lang="scss">
  @import "../../assets/css/changecity/categroy.scss";
</style>
