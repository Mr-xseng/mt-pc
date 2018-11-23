import mongoose from 'mongoose'

const PositionModule = mongoose.model('Position',new mongoose.Schema({
  province:{
    type:String,
    require:true
  },
  city:{
    type:String,
    require:true
  }
}))
export default PositionModule
