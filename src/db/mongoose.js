const mongoose =  require('mongoose')
const validator = require('validator')
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true, useCreateIndex:true,useUnifiedTopology: true
})
//Create DB with name Users
// const user =  mongoose.model('Users',{
//     name:{type:String , required:true, trim :true},
//     age:{type :Number, default:0, validate(value){
//       if(value<0){
//        throw new Error("Negitive age is not allowed")
//       }
//     }},
//     Email:{type:String, validate(value){

//         if(!validator.isEmail(value)){

//             throw new Error("Email is not valid formate")

//         }

//     }},
//     password:{type:String,required:true,trim:true,minLength:7}


// })



// // Create Insitance of DB

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


// create new DB with name task

// const task = mongoose.model('workStatus',{
//     description:{type:String},
//     CompletionStatus: {type:Boolean}

// })

//  const task1 = new task({
//      description : 'Fiori Work',
//      CompletionStatus:'true'

//  })

//  task1.save().then(()=>{
//  console.log(task)
//  }).catch((error)=>{
//    console.log("Error",error)
//  })



