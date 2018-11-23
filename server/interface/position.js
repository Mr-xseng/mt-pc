import Router from 'koa-router'
import Position from '../dbs/models/position'
import dbsModule from '../dbs/config'
import mongoose from 'mongoose'

const router = new Router({
  prefix:'/position'
})

router.post('/setNewPosition',async ctx => {
  mongoose.connect(dbsModule.dbs,{
    useNewUrlParser:true
  })
  let {province,city} = ctx.request.body
  let position = new Position({
    city,
    province
  })
  await Position.find({}).deleteOne()
  let result = await position.save()
  if (result) {
    ctx.body = {
      code:0
    }
  } else {
    ctx.body = {
      code:-1
    }
  }
})

router.post('/getNewPosition',async ctx => {
  let result = await Position.find({})
  if (result) {
    ctx.body = {
      code:0,
      newPosition:result
    }
  } else {
    ctx.body = {
      code:-1
    }
  }
})


export default router
