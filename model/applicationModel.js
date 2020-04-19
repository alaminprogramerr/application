const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicationSchema= new Schema({
    title:String , description:String , img:String

})
const applicationModel = mongoose.model('applicationModel',applicationSchema)
module.exports=applicationModel