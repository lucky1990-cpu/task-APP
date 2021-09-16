const mongoose =  require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    description:{type:String},
    CompletionStatus: {type:Boolean}

},{
    timestamps:true
    
})

// Create DB name inside task-manager-api
const task = mongoose.model('workStatus',taskSchema
//{
//     description:{type:String},
//     CompletionStatus: {type:Boolean}

// }
)

module.exports = task;