<template>
  <div class="m-iselect">
    <span
      class="name"
      style="margin-right: 15px;font-size:16px">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市"
      style="margin-left:15px"
    >
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <span style="margin-left:30px;font-size:16px">直接搜索：</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'
import pyjs from 'js-pinyin'
export default {
  data () {
    return {
      pvalue: '',
      province:[],
      cvalue:'',
      city: [],
      input:'',
      cities:[],
      newPosition:{}
    }
  },
  watch: {
   pvalue: async function(newPvalue){
     let self = this
     // console.log(newPvalue)
     let {status,data:{city}} = await axios.get(`/geo/province/${newPvalue}`)
      if (status) {
        self.city = city.map(item => {
          return {
            value:item.id,
            label:item.name
          }
        })
      }
      self.cvalue = ''
    }
  },
  mounted: async function () {
    let self = this
    let {status,data:{province}} = await axios.get('/geo/province')
    if (status === 200) {
      self.province = province.map(item => {
        return {
          label:item.name,
          value:item.id
        }
      })
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(query,cb) {
      let self = this
      const isChinese = /.*[\u4e00-\u9fa5]+.*$/.test(query)
      if (!self.cities.length) {
        let {status,data:{city}} = await axios.get('/geo/city')
        if (status === 200 && query) {
          self.cities = city.map(item => {
            return {
              value:item.name,
              province:item.province,
              city:item.name,
              pinyin:pyjs.getFullChars(item.name).toLocaleLowerCase()
            }
          })
        }
      }
    cb(self.cities.filter(item => (isChinese ? item.value:item.pinyin).indexOf(query) > -1))
    },200),
    handleSelect:async function () {
      let city = this.input
      let newCity = this.cities.filter(item => item.city === city)
      this.newPosition = {
        province:newCity[0].province,
        city:newCity[0].city
      }
      let {status,data:{code}} = await axios.post('position/setNewPosition',{
        province:this.newPosition.province,
        city:this.newPosition.city
      })
      if (status===200&&code===0) {
        window.location.href = '/'
      }
    }
  }
}
</script>
<style lang="scss">
  @import "../../assets/css/changecity/iselect.scss";
</style>
