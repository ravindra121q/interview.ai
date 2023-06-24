const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: false
        },
        score:{
            type:Number,
            default: Number(0)
        },
        feedback:{
            type:String
        },
        attempt:{
            type: Boolean,
            default: false
        }

    }

    , {
        versionKey: false
    })
const usermodel = mongoose.model("userdetails", schema)
module.exports = {
    usermodel
}