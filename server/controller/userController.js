const User = require("../models/userSchema")
const createUser = async (req,res)=>{
    const {firstName,lastName, userName,email, password, roles} = req.body
    if(!firstName || !lastName || !userName || !password)
        return res.status(400).json({ message: 'all fields are required'})
    const findUser = await User.findOne({userName:userName}).lean()
    if(findUser)
        return res.status(409).json({ message: 'userName exist already'})
    if(!roles)
        roles = "User"
    const user = await User.create({firstName,lastName, userName, email, password, roles})
    res.json(user)       
}
const getAllUsers = async (req,res)=>{
    const users = await User.find().lean()
    if(!users.length)
        return res.status(400).json({ message: 'no user found'})
    res.json(users)
}


module.exports = {createUser, getAllUsers}