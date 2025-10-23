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
  }

});

export default mongoose.model("UserModel", userSchema);
