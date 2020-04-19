const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema= new Schema({
    name:String , email:String , password:String, contactnumber:Number ,description:String

})
const userModel = mongoose.model('userModel',userSchema)
module.exports=userModel