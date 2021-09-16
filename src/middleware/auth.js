const jwt  = require('jsonwebtoken')
const user = require('../models/user')
const auth =   async(req,res,next)=>{
    //    console.log('authantication check')
    //    next()

   try{
       const token = req.header('Authorization')
       const decode = jwt.verify(token,'thisismytoken')
       const User = await user.findOne({_id:decode._id,'tokens.token':token})
       if(!user){
         throw new error()
       }
       req.Particularuser= User;
       next()

   }catch(e){
   
       res.send('Bad req')
   }


}

module.exports = auth