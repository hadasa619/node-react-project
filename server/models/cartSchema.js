const { Timestamp } = require("bson")
const { timeStamp } = require("console")
const mongoose = require("mongoose")
const { type } = require("os")

const cartSchema = mongoose.Schema(
    {
        prodId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required:true
        },
        qty:{
            type:Number,
            default:1
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required:true
        },
        size:{
            type: String,
            required:true
        }
    },{timestamps:true})

module.exports = mongoose.model("cart", cartSchema)