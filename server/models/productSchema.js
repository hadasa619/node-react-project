const { timeStamp } = require("console")
const mongoose = require("mongoose")
const { type } = require("os")
const productSchema = mongoose.Schema(
    {
        prodName: {
            type: String,
            required: true
        },
        size: [{
            option:{
                type: String,
                required: true
            },
            price:{
                type: Number,
                required: true
            }
        }],
        category: {
            type: String,
            enum: ["simple", "special"],
            default: "special"
        },
        image: {
            type: String
        },

    }, {timestamps:true})

module.exports = mongoose.model("Product", productSchema)  