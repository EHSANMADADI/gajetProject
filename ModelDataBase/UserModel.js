import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age:{
     type:Number,
     require:false,
     default:60
  },
  lastName:{
    type:String,
    required:true
  },
  firstName:{
    type:String,
    required:true
  },
  gender:{
    type:Boolean,
    required:true
  },
  info:{
    type:String,
    required:false
  }
});

export default mongoose.model("UserModel", userSchema);
