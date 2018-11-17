import mongoose from "mongoose";

const UserModel =  mongoose.model('user',new mongoose.Schema({
  username:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  }
}))
export default UserModel
