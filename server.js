const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dbs = 'mongodb://127.0.0.1:27017/person'
mongoose.connect(dbs,{
  useNewUrlParser: true
})
mongoose.connection.on('connected',function () {
  console.log('mongo connect success')
})

const Person = mongoose.model('person',new mongoose.Schema({
  name: {
    type: String,
    require:true
  },
  age: {
    type: Number,
    require: true
  }
}))
Person.create({
  name: 'immock',
  age: 18
},function (err,doc) {
  if (!err) {
    console.log(doc);
  } else {
    console.log(err)
  }
})


app.get('/',function (req,res) {
  res.send(`<h1>this is server test</h1>`)
})

app.get('/data', async function (req,res) {
  await Person.save()
  Person.find({},function (err,doc) {
    res.json(doc)
  })
})

app.listen(9009,function () {
  console.log('Node app listen at 9009')
})


