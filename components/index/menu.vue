<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="onLeave"
    >
      <dt>全部分类</dt>
      <dd
        v-for="(item, index) in menu"
        :key="index"
        @mouseenter="onEnter"
      >
        <i :class="item.type"/>{{ item.name }}<span class="arrow"/>
      </dd>
    </dl>
    <div
      v-show="kind"
      class="detail"
      @mouseenter="sover"
      @mouseleave="sout"

    >
      <template
        v-for="(item, index) in curDetail"
      >
        <h4 :key="index">{{ item.title }}</h4>
        <span
          v-for="v in item.content"
          :key="v"
        >{{ v }}</span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      kind: '',
      menu: [
        {
          type: 'food',
          name: '美食',
          info: [{
            title: '美食',
            content: ['代金券','甜点饮品','自助餐','小吃快餐']
          }]
        },
        {
          type: 'takeout',
          name: '外卖',
          info: [{
            title: '外卖',
            content:['美团外卖']
          }]
        },
        {
          type:'hotel',
          name: '酒店',
          info: [{
            title: '酒店星级',
            content: ['经济型','舒适/三星','高档/四星','豪华/五星']
          }]
        }
      ]
    }
  },
  computed: {
    curDetail () {
      let curItem
      const menuList = this.menu
      for(let i = 0;i < this.menu.length; i++) {
        if (menuList[i].type === this.kind) {
          curItem = menuList[i].info
        }
      }
      return curItem
    }
  },
  methods: {
    onLeave () {
      let self = this;
      self._timer = setTimeout(() => {
        this.kind = ''
      },150)
    },
    onEnter (e) {
      this.kind = e.target.querySelector('i').className
    },
    sover () {
      clearTimeout(this._timer)
    },
    sout () {
      this.kind = ''
    }
  }
}
</script>
<style lang="css">

</style>
