const User= require('../models/User')
const {StatusCodes}= require('http-status-codes')
const CustomError= require('../errors')
const{attachCookiesToResponse, createTokenUser, checkPermissions}= require('../utils')

const getAllUsers= async(req,res)=>{
    const users= await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({users, count:users.length})
}

const getSingleUser= async(req,res)=>{
    const user= await User.findOne({_id:req.params.id}).select('-password')
    if(!user) throw new CustomError.NotFoundError(`User with the given ID: ${req.params.id} not found`)
    checkPermissions(req.user, user._id)
    res.status(StatusCodes.OK).json({user})
}

const showCurrentUser= async(req,res)=>{
    const user= await User.findOne({_id:req.user.userId}).select('-password')
    res.status(StatusCodes.OK).json({user})
}

const updateUser= async(req,res)=>{
    const {name,email}= req.body
    if(!name || !email) throw new CustomError.BadRequestError('please provide name and email')
    const user= await User.findOne({_id:req.user.userId})
    if(!user) throw new CustomError.UnauthenticatedError('Invalid Authentication')
    checkPermissions(req.user, user._id)
    user.name= name
    user.email= email
    await user.save()
    const tokenUser= createTokenUser(user)
    attachCookiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.OK).json({user:tokenUser})
}

const updateUserPassowrd= async(req,res)=>{
    const {oldPassword,newPassword}= req.body
    if(!oldPassword || !newPassword) throw new CustomError.BadRequestError('please provide both passwords')
    const user= await User.findOne({_id:req.user.userId})
    if(!user) throw new CustomError.UnauthenticatedError(`User with the given ID: ${req.user.userId} not found`)
    const isPasswordCorrect= await user.comparePassword(oldPassword)
    if(!isPasswordCorrect) throw new CustomError.UnauthenticatedError('Invalid Authentication')
    user.password= newPassword
    await user.save()
    res.status(StatusCodes.OK).json({msg:"successfully updated user passowrd!!"})
}

module.exports= {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassowrd
}