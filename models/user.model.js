const db = require('../config/database')
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name :{
        type:String
    },
    apiKey:{
       type:String 
    },
},{timeStamp:true});

const userModel = db.model('user',userSchema)
module.exports = userModel
