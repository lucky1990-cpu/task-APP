require('../src/db/mongoose')
const task = require('../src/models/task')


task.findByIdAndDelete('61289e3eca8d634aa4cf2a04').then((del_res)=>{
console.log(del_res)
return task.countDocuments({CompletionStatus:true})
}).then((result)=>{
  console.log(result)
})



