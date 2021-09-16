const express = require('express');
const app = express()
var bodyParser = require('body-parser')
const user = require('./models/user')
const task = require('./models/task')
const userRoute =  require('./routes/user')
const bcrypt = require('bcrypt');
require('./db/mongoose')


//create Middle Ware 

// app.use((req,res,next)=>{
// // console.log(req.method,req.path)

// if(req.method==="GET"){
//  res.send('get call is not possible now its under maintaince mode')
// }else{
// next()
// }

// })

app.use(express.json()) 


app.use(userRoute)  // to register routes 




// logic for task 
app.post('/Task',(req,res)=>{
    console.log(req.body)
    const oTaskIns = new task(req.body)
    oTaskIns.save().then(()=>{
       res.send(oTaskIns)
    }).catch((e)=>
    {
        res.status(400).send(e)
       
    })

})

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

// app.post('/Users',async(req,res)=>{
//     const me = new user(req.body)
// try{
//      await me.save()
//     res.status(200).send(me);

// }catch(e){
//    res.status(400).send(e)
// } 

        
// })




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

// app.get('/Users',async(req,res)=>{
//     try{
//      const getUser =  await user.find({})
//      res.send(getUser);
//     }catch(e){
//      res.send(e)
//     }
// })

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

// app.get('/Users/:id',async(req,res)=>{
//     const userId =  req.params.id;

//     try{

//     const getUser =   await user.findById(userId)
//     if(!getUser){
//        return res.status(400).send('user not found')
//     }
//     res.send(getUser);
//     }catch(e){
//       res.status(400).send(e)

//     }
// })

//delete user by id 

// app.delete('/Users/:id',async(req,res)=>{

//     try{
//        const delUser=  await user.findByIdAndDelete(req.params.id)
//        if(!delUser){
//         return res.status(401).send()
//        }

//        res.send(delUser)

//     }catch(e){

//         res.status(404).send(e)

//     }


// })

//get task information
app.get('/tasks',(req,res)=>{
    const limtval = parseInt(req.query.limit)

    
   const taskvalues =  task.find({})
   taskvalues.limit(limtval).then((taskInfo)=>{
        console.log(taskInfo)
        
        res.send(taskInfo)
        }).catch((e)=>{
            res.status(400).send()
        })
        taskvalues.skip(parseInt(req.query.skip))
   
})

//get user info by ID
app.get('/tasks/:id',(req,res)=>{
    const taskId =  req.params.id;
    console.log("user id",taskId);
    task.findById(taskId).then((taskDetail)=>{
        console.log("user details",taskDetail)
        if(!taskDetail){
            return res.status(400).send()
          //return res.send(`${userId} not found`)
        }
        res.send(taskDetail)

    }).catch((e)=>{
     console.log(e)
    })

})

// password saved in hash algorithim

 

 const myFunction =  async()=>{
     const password =  'lucky1234';
     const hashpassword =  await bcrypt.hash(password,8)  
     console.log(password);
     console.log(hashpassword);

     const isMatch = await bcrypt.compare('lucky1234',hashpassword);
     console.log(isMatch)
 }

 //myFunction();
  const jwt  = require('jsonwebtoken')
 const myFunction1 = async()=>{
  const token =  jwt.sign({_id:'abc1234'},'thisismytoken')
  console.log("***********Token generator****************")
  console.log(token)
   console.log("**************** token varification ***************")
   const data =  jwt.verify(token,'thisismytoken')
   console.log(data)

 }
 myFunction1()


 console.log("*************file Upload Practics*******************")

 const multer = require('multer')

 const upload = multer({
     dest: 'images'
 })

app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send(200)
})



const port =  process.env.PORT;
app.listen(port,()=>{
    console.log('running', port)
})