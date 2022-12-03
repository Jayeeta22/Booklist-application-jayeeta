const express=require('express');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Router=express.Router()
require('../db/connection')
const User=require('../models/userSchema');
Router.get("/",(req,res)=>{
    res.send("router")
})

// registration
Router.post("/register",async(req,res)=>{
    const {username,password,Cpassword}=req.body
    if(!username || !password || !Cpassword){
        return res.status(422).json({Error:"allfield are mandatory"})
    }
    try{
        const userexist=await User.findOne({username:username})
        if(userexist){
            return res.status(422).json({Error:"email already exist"})
        }
        const user=new User({username,password,Cpassword})
        await user.save()
        return res.status(201).json({Massage:"registration successful"})
    }catch(err){
        console.log(err)
    }
})


// login

Router.post("/login",async(req,res)=>{
    let token
    console.log(req.body)
    const {username,password}=req.body
    if(!username || !password ){
        return res.status(422).json({Error:"allfield are mandatory"})
    }
    try{
        const userLogin=await User.findOne({username:username})
        console.log(userLogin)
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password)
            token=await userLogin.generateAuthToken()
            console.log(token)
            if(!isMatch){
                return res.status(400).json({Error:"erroe"})
            }else{
                return res.status(200).json({Massage:"signin successful"})
            }
        }else{
            return res.status(400).json({Error:"Error"})
        }
    }catch(err){
        console.log(err)
    }
    
})

module.exports=Router