const express= require('express')
const router= express.Router()
const {createTask, getAllTasks, getSingleTask, getCurrentUserTask, updateTask, deleteTask}= require('../controllers/taskController')
const {authenticateUser,authorizePermissions}= require('../middleware/authentication')

router.route('/').post(authenticateUser, createTask).get([authenticateUser,authorizePermissions('admin')], getAllTasks)
router.route('/showAllMyTask').get(authenticateUser,getCurrentUserTask)
router.route('/:id').get(authenticateUser, getSingleTask).patch(authenticateUser,updateTask)
.delete(authenticateUser,deleteTask)

module.exports= router