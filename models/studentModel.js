import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema(
  {
    IDCard: { type:Number,require: true },
    name: { require: true, type: String },
    email:{type: String,required: true, unique: true},
    phone:{type:String,required:true },
    classId:{type:Number,require:true},
  },
  { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);
