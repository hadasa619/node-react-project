const User = require("../models/userSchema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req,res)=>{ 
    const { userName, password } = req.body
    if (!userName || !password) {
    return res.status(400).json({message:'All fields are required'})
    }
    const foundUser = await User.findOne({userName}).lean()
    if (!foundUser) {
    return res.status(401).json({ message: 'Unauthorized'})
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if(!match)return res.status(401).json({message:'Unauthorized' })
    const userInfo= {_id:foundUser._id,firstName:foundUser.firstName,lastName:foundUser.lastName,
    roles:foundUser.roles, userName:foundUser.userName}  
    const accessToken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})
} 
const register = async (req,res)=>{
    const {firstName, lastName,userName, email, password} = req.body
    if (!firstName || !lastName || !userName || !password) {
    return res.status(400).json({message:'fields are required'})
    }
    const duplicate = await User.findOne({userName:userName}).lean() 
    if(duplicate){
    return res.status(409).json({message:"Duplicate username"})
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject= {firstName,lastName,userName,email,password:hashedPwd}
    const user = await User.create(userObject)
    if (user) { 
    return res.status(201).json({message:`New user ${user.userName} 
    created`})
    } else {
    return res.status(400).json({message:'Invalid user'})
    }
}

module.exports = {login, register}