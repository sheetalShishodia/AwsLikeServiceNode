const router = require('express').Router();
const userModel = require("../models/user.model");
const cryto = require("crypto-js")
const Auth = require('../middleware/auth.middleware')

router.post('/register',async (req,res)=>{
    try{
        const {name} = req.body
        var str =  name + new Date().getTime();
        const apiKey = cryto.SHA256(str).toString().slice(0,20);
        const userCreated = new userModel({name,apiKey})
        await userCreated.save();
        res.json({
            status:200,
            sucess:"user created"
        })
    }
    catch(error){
        console.log(error)
    }
})

router.post('/login',Auth.userAuthMiddle,async(req,res)=>{
 try{
    if(req.user){
        res.json({
            status:200,
            sucess:req.user
        })
    }

 } catch(error)
 {
    console.log(error);
 }

})

module.exports= router
