import Router from 'koa-router'
import axios from './utils/axios'
const router = new Router({
  prefix: '/categroy'
})

const sign = 'bb9afbba667fd0deb80ea7faea3f1c5f'

router.get('/crumbs',async (ctx) => {
  let city = ctx.query.city
  let { status,data:{areas,types} } = await axios.get(`http://cp-tools.cn/categroy/crumbs`, {
    params:{
      city,
      sign
    }
  })
  ctx.body = {
    areas:status === 200 ? areas: [],
    types:status === 200 ? types: []
  }
})

export default router
