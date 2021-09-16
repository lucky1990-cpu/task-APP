const mongoose =  require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')

// if any validation is required we are going to add middleware logic


  const UserSchema =  new mongoose.Schema(
    {
        name:{type:String ,  trim :true},
        age:{type :Number, default:0, validate(value){
          if(value<0){
           throw new Error("Negitive age is not allowed")
          }
        }},
        Email:{type:String, required:true, unique:true, validate(value){
    
            if(!validator.isEmail(value)){
    
                throw new Error("Email is not valid formate")
    
            }
    
        }},
        password:{type:String, required:true,trim:true,minLength:7},
        tokens:[ {
                 token:{
                   type: String,
                   required:true
                 } 
         }],

         avatar:{
          type:Buffer
        }
    
    
    },
    {
      timestamps:true
    }
  
  )
   UserSchema.pre('save',async function(next){
   const user = this;
   console.log('calling before save data in DB')
     if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password,8)
     }
     next()
   })
  UserSchema.methods.genreteToken = function(){
    console.log('user token calling')
  }
   UserSchema.methods.gererateAuthonticationToken =  async function(){
    console.log("token call from user")
    
    const userId =  this
     const token =  jwt.sign({_id:userId._id},'thisismytoken')
      userId.tokens = userId.tokens.concat({token})
      await userId.save();
     
     return token
  }
  UserSchema.statics.findByCredentials = async(email, password)=>{
    console.log("findcradintails is calling")
    console.log(email)
    console.log(password)
    const userValidation = await user.findOne({Email:email})
    console.log(userValidation)
    if(!userValidation){
      throw new Error('unable to find ')
  
    }
    const isMatch =  await bcrypt.compare(password,userValidation.password)
    console.log(isMatch)
    if(!isMatch){
       throw new errro('unable to find')
    }
    return userValidation;
  
  }

  

  
  
const user =  mongoose.model('Users',UserSchema
// {
//     name:{type:String ,  trim :true},
//     age:{type :Number, default:0, validate(value){
//       if(value<0){
//        throw new Error("Negitive age is not allowed")
//       }
//     }},
//     Email:{type:String, required:true, validate(value){

//         if(!validator.isEmail(value)){

//             throw new Error("Email is not valid formate")

//         }

//     }},
//     password:{type:String, required:true,trim:true,minLength:7}


// }
)

// Create Insitance of DB

// const me = new user( 
//     {
//         name:'Hamid',
//         age:30,
//         Email:'Rehhan@gmail.com',
//         password:'HamidAli123'

// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//   console.log("Error", error);
// })







module.exports= user