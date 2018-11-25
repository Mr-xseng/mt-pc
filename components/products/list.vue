<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="(item,index) in nav"
        :key="item.name"
        :class="[item.name,item.index===currentIndex?'s-nav-active':'']"
        @click="navSelect(index)"
      >{{ item.txt }}</dd>
    </dl>
    <ul>
      <!-- //产品列表 -->
      <Item
        v-for="(item,idx) in list"
        :key="idx"
        :meta="item"/>
    </ul>
  </div>
</template>

<script>
  import Item from './product.vue'
  export default {
    components: {
      Item
    },
    props: {
      list: {
        type:Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        currentIndex:0,
        // copyList:[],
        nav: [
          {
            name: 's-default',
            txt: '智能排序',
            index:0
          }, {
            name: 's-price',
            txt: '价格最低',
            index:1
          }, {
            name: 's-visit',
            txt: '人气最高',
            index:2
          }, {
            name: 's-comment',
            txt: '评价最高',
            index:3
          }
        ]
      }
    },
    // mounted() {
    //   this.copyList = this.list
    // },
    methods: {
      navSelect: function (index) {
        const copyList = this.list.slice()
        this.currentIndex = index
        if (index === 0) {
          this.list = this.$store.state.geo.productList
        }
        if (index===1) {
          this.list = copyList.sort((a,b) => a.price - b.price)
        }
        if (index === 2) {
          this.list = copyList.sort((a,b) => a.comment - b.comment)
        }
        if (index === 3) {
          copyList.sort((a,b) => b.rate - a.rate)
          this.list = copyList
        }
      }
    }
  }
</script>
