const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')

// we are setting middleware to avoid try catch block
const getAllTasks = asyncWrapper(async (req,res)=>{
    try {
        // task.find is a model query which takes a object with
        // parameter as input and find the matching objects
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({msg:error})
    }

})


const createTask= async (req,res) =>{
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task}) 
    } catch (error) {
        res.status(500).json({msg:error})
    }

}

const getTask=async (req,res) =>{
try {
    const {id:taskID} = req.params
    const task = await Task.findOne({_id:taskID})

    if(!task){
       return res.status(404).json({msg:`No task with id : ${taskID} `})
    }

    res.json({task})
} catch (error) {
    res.status(500).json({msg:error})
}
    
}

const updateTask= async (req,res) =>{
    try {
        const {id:taskID} = req.params
        // if we dont use option object then the response we will be getting will be the older one
        // by using options we can also setup validators for the update task as well
        // options object is to be used after req.body
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true, // this will always make sure to return the new value
            runValidators:true  // it will run the validators and will keep data in check
        })
        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID} `})
         }
         res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteTask= async (req,res) =>{
   try {
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task)
    {
       return res.send(404).json({msg:'no task with this id'})
    }
     res.status(200).json({task})
   } catch (error) {
    res.status(500).json({msg:error})
   }
}

module.exports = {
    getAllTasks, createTask,getTask,updateTask,deleteTask 
}