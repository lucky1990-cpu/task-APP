const express =  require('express')
const user = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const router =  new express.Router()


// app.post('/Users',(req,res)=>{
// // res.send(req.body);
//  console.log(req.body)
// const me = new user(req.body);
// me.save().then(()=>{
//  console.log(me)
//  res.send(req.body);
// }).catch((e)=>{
//     res.status(400)
//     res.send(e);
//     console.log(e)
// })
// })



//await functionality 

router.post('/Users',  async(req,res)=>{
    const me = new user(req.body)
  
try{
  
     await me.save()
     const userToken =  await me.gererateAuthonticationToken();
    res.status(200).send({me,userToken});

}catch(e){
   res.status(400).send(e)
} 

        
})




// get call for user
// app.get('/Users',(req,res)=>{
//     user.find({}).then((userinfro)=>{
//     console.log(userinfro)
//     res.send(userinfro)
//     }).catch((e)=>{
//         res.status(400).send()
//     })

// })

// get call by await asymc

router.get('/Users/me',auth,async(req,res)=>{
    // try{
    //  const getUser =  await user.find({})
    //  res.send(getUser);
    // }catch(e){
    //  res.send(e)
    // }
      res.send(req.Particularuser)

})

router.post('/User/logout',auth,async(req,res)=>{
    
  try{
    req.Particularuser.tokenvalue = req.Particularuser.tokens.filter((token)=>{
        return token.token != req.token
    })

    await req.Particularuser.save()
    res.send();
  }catch(e){
     console.log(req.Particularuser)
     res.status(404).send(e)
  }
})

router.post('/user/Allout',auth,async(req,res)=>{
  try{
    req.Particularuser.tokenvalue = []

    await req.Particularuser.save()
    res.send();
  }catch(e){
     console.log(req.Particularuser)
     res.status(404).send(e)
  }
})

//get user info by ID
// app.get('/Users/:id',(req,res)=>{
//     const userId =  req.params.id;
//     console.log("user id",userId);
//     user.findById(userId).then((userDetail)=>{
//         console.log("user details",userDetail)
//         if(!userDetail){
//             return res.status(400).send()
//           //return res.send(`${userId} not found`)
//         }
//         res.send(userDetail)

//     }).catch((e)=>{
//      console.log(e)
//     })

// })


// find user by id using async await fn

router.get('/Users/:id',async(req,res)=>{
    const userId =  req.params.id;

    try{

    const getUser =   await user.findById(userId)
    if(!getUser){
       return res.status(400).send('user not found')
    }
    res.send(getUser);
    }catch(e){
      res.status(400).send(e)

    }
})

//delete user by id 

router.delete('/Users/:id',async(req,res)=>{

    try{
       const delUser=  await user.findByIdAndDelete(req.params.id)
       if(!delUser){
        return res.status(401).send()
       }

       res.send(delUser)

    }catch(e){

        res.status(404).send(e)

    }


})
// login user 
router.post('/Users/login',async(req,res)=>{
try{
  console.log("************User login Varification ***************")
  console.log(req.body)
   
  const userVal =  await user.findByCredentials(req.body.Email, req.body.password)
  const token =  await userVal.gererateAuthonticationToken()
  console.log(token)
  // console.log(`userval value ${userVal}`)
  res.send({userVal,token})
}catch(e){
  res.status(400).send(e)
}
})


//*********************File Upload*********** */

const upload = multer({
  //  dest: 'avtars',
  limits:{
   fileSize:1000000
  },
  fileFilter(req, file, cb){
    if(!file.originalname.endsWith('.jpg')){
     return cb( new Error('please enter file informate of pdf'))
    }
    
      cb(undefined, true)
    
  }
})

router.post('/user/me/avtars',upload.single('avtars'),(req,res)=>{
  const me = new user(req.file.buffer)
  
  me.save();
 res.send(200)
},(error,req,res,next)=>{
   res.status(400).send({error: error.message})
}
)

// ************** Delete file *****************


module.exports =  router