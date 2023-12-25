const db = require('../config/database')
const mongoose = require('mongoose');
const {Schema} = mongoose;
const userModel = require('../models/user.model')

const uploadSchema = new Schema({
   userId:{
    type:Schema.Types.ObjectId,
    ref :userModel.modelName
   },
   fileName:{
    type:String
   },
   mimeType:{
    type:String
   },
   path:{
    type:String
   }
},{timeStamp:true});

const uploadModel = db.model('upload',uploadSchema);
module.exports = uploadModel
