// const mongoose=require("mongoose");
const express=require('express');
const dotenv=require("dotenv");
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())
const { application } = require("express");
dotenv.config({path:"./config.env"})
require('./db/connection')
require('./models/userSchema')
app.use(require('./router/router'))
const port=process.env.PORT || 5000;
app.get("/",(req,res)=>{
    res.send("hel")
})
app.listen(port,()=>{
    console.log(`server is up on ${port}`)
})