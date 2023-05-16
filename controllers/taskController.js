const User= require('../models/User')
const Task= require('../models/Task')
const {StatusCodes}= require('http-status-codes')
const CustomError= require('../errors')
const{checkPermissions}= require('../utils')

const createTask= async(req,res)=>{
    req.body.user= req.user.userId
    const task= await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({task})
}

const getAllTasks= async(req,res)=>{
    const tasks= await Task.find({}).populate({path:'user', select:'name'})
    res.status(StatusCodes.OK).json({tasks, count:tasks.length})
}

const getSingleTask= async(req,res)=>{
    const {id:taskId}= req.params
    const task= await Task.findOne({_id:taskId})
    if(!task) throw new CustomError.NotFoundError(`Task with the given ID: ${taskId} not found`)
    checkPermissions(req.user, task.user)
    res.status(StatusCodes.OK).json({task})
}

const getCurrentUserTask= async(req,res)=>{
    const task= await Task.find({user:req.user.userId})
    res.status(StatusCodes.OK).json({task, count:task.length})
}

const updateTask= async(req,res)=>{
    const { id:taskId }= req.params
    const task= await Task.findOneAndUpdate({_id:taskId},req.body,{new:true,runValidators:true})
    if(!task) throw new CustomError.NotFoundError(`Task with the given ID: ${taskId} not found`)
    checkPermissions(req.user, task.user)
    res.status(StatusCodes.OK).json({task})
}

const deleteTask= async(req,res)=>{
    const { id:taskId }= req.params
    const task= await Task.findOne({_id:taskId})
    if(!task) throw new CustomError.NotFoundError(`Task with the given ID: ${taskId} not found`)
    checkPermissions(req.user, task.user)
    await task.remove()
    res.status(StatusCodes.OK).json({msg:'Task has been succesfully removed!!'})
}

module.exports= {
    createTask,
    getAllTasks,
    getSingleTask,
    getCurrentUserTask,
    updateTask,
    deleteTask
}