const mongoose=require("mongoose");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    Cpassword:{
        type:String
    },
    tokens:[{
        token:{type:String}
    }]
})

// hasing the password
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,12)
        this.Cpassword=await bcrypt.hash(this.Cpassword,12)
    }
    next()
})

// generate token

userSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.token=this.tokens.concat({token:token})
        await this.save()
        return token;
    }catch(err){
        console.log(err)
    }
}

const User=mongoose.model("User",userSchema);

module.exports=User
