const userModel = require('../models/user.model')

exports.userAuthMiddle = async(req,res,next)=>{
    try{
        const apiKey = req.query.apiKey;
        if(!apiKey)
        {
            return res.json({
                status:400,
                message:"apiKey is mandatory"
            })
        }
        const getUser = await userModel.findOne({apiKey:apiKey});
        if(!getUser)
        {
            return res.json({
                status:400,
                message:"apiKey is mandatory"
            })  
        }
        req.user = getUser;
        next();
    }
    catch(error)
    {
        console.log(error);
    }
}
