const mongoose = require('mongoose')

// normally mongoDB doesnt have a definite structure so we are setting one with schema

// only the properties specified will be added to the database
const TaskSchema = new mongoose.Schema({
    // adding some validators so that only true value is stored
   name:{
     type:String,
     required:[true,"name must be provided"],
     trim:true,
     maxlength:[20,'name cannot be more than 20 characters']
   },
   completed:{
    type:Boolean,
    default:false
   }
})

module.exports = mongoose.model('Task',TaskSchema)