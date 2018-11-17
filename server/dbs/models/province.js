import mongoose from "mongoose";

const Province =  mongoose.model('Province',new mongoose.Schema({
  id:{
    type:Number,
    require:true
  },
  value:{
    type:String,
    require:true
  }
}))
export default Province
