import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    fullname: { type:String,require: true },
    email:{type: String,required: true, unique: true},
    password:{type:String,required:true },
    role:{type:String,require:true},
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
