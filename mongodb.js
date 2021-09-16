// const mongodb=  require('mongodb')
// const MongoClient = mongodb.MongoClient
// const  ObjectID = mongodb.ObjectId 

const {MongoClient ,  ObjectId } = require('mongodb')
const connectionURL =  'mongodb://localhost:27017'
const databasename = 'task-manager'

const id =  new ObjectId();
console.log(id)
console.log(id.id)
console.log(id.id.length)
console.log(id.getTimestamp())
console.log(id.toHexString)
MongoClient.connect(connectionURL,  { useNewUrlParser: true }, (error,client)=>{

    if(error){
   return console.log('connection not possible');

    }
     const db = client.db(databasename);

     // Create Data Base 

    //  db.collection('users').insertOne({
    //      _id :id,
    //      name:'Nafis',
    //      age:'30'
    //  },(error, result)=>{

    //     if(error){
    //         return console.log('insert not possible');

    //     }

    //     console.log(result);

    //  })
    // db.collection('users').insertMany([{
    //     name:'lucky',
    //     age:'30'
    // },{
    //     name:'nitish',
    //     age:'29'

    // }],(error, result)=>{

    //    if(error){
    //        return console.log('insert not possible');

    //    }

    //    console.log(result);

    // })

//     db.collection('task').insertMany([{
//         _id:id,
//         work:'FioriWork',
//         status: false
//     },
//     {
        
//         work:'Node',
//         status: true
//     },
//     {
        
//         work:'Abap',
//         status: false
//     },
//     {
       
//         work:'CAB',
//         status: false
//     }


// ],(error,task)=>{
//     if(error){
//         return  console.log(error)
//     }
//     console.log(task)

// })

 // Read : how to read value from database

//  db.collection('users').findOne({_id: new ObjectId("6123da4bc842a9036974cf5f")},(error,user)=>{
//      if(error){
//       return   console.log("error happend to read DB")

//      }

//      console.log(user)
//  })

// })


db.collection('users').find({name:'Nafis'}).toArray((error,user)=>{

    if(error){
        return console.log(error)
    }
    console.log(user)
})

db.collection('task').find({status:false}).toArray((error,user)=>{

    if(error){
        return console.log(error)
    }
    console.log(user)
})


console.log("*************Update operation **********")

const promi = db.collection('users').updateOne(
    {
        _id:new ObjectId("6123da4bc842a9036974cf5f")
    },
    {
        $set: {name:'rahul'}
    }
)

promi.then((result)=>{
 console.log(result)
}).catch((error)=>{
console.log(error)
}
)

db.collection('task').updateMany({
    status:false
},
{
    $set:{status:true}
}).then((result)=>{
 console.log(result)
}).catch((error)=>{
console.log(error);
})

//  Delete 

db.collection('users').deleteMany({
    age:'30'
}).then((result)=>{
 console.log("success")
}).catch((error)=>{
console.log(error)
})



})