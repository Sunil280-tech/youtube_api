import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    
    channelName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    logoUrl:{type:String,required:true},
    logoId:{type:String,required:true},
    subscribers:{type:Number,default:0},
    subscribedChannels:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]
},
{ timestamps:true})

export const User=mongoose.model("User",userSchema)

