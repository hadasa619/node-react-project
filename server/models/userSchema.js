const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
{
   firstName:{
    type:String,
    required:true
   },
   lastName:{
    type:String,
    required:true
   },
   userName:{
    type:String,
    required:true,
    unique:true
   },
   email:{
      type:String
   },
   password:{
    type:String,
    required:true
   },
   roles:{
    type:String,
    enum:["User", "Owner"],
    default:"User"
   },
   // cart:[cartSchema]
},{timestamps:true})

module.exports = mongoose.model("User", userSchema)