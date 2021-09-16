require('../src/db/mongoose')
const user = require('../src/models/user')

// user.findByIdAndUpdate('61255495c341d3287035c75e',{age:1}).then((userInfo)=>{

//     console.log(userInfo)

//     return user.countDocuments({age:1})

// }).then((result)=>{
//   console.log(result)
// }).catch((e)=>{
//   console.log(e)
// })

//get user infor by ID

const useIndfoById =  async(id,age)=>{
    await user.findByIdAndUpdate(id,{age})
    const count = await user.countDocuments({age})

    return count
}

useIndfoById('6124c9360f5ab041ac2b4b49',30).then((result)=>{
  console.log(result);
}).catch((e)=>{
  console.log(e)

})



user.deleteMany({age:0}).then((result)=>{
   return user.countDocuments()
}).then((reults2)=>{
  console.log(reults2)
})