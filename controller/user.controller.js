import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import {User} from "../models/user.model.js"
import cloudinary from "../config/cloudinary.config.js"



export const signUp=async(req,res)=>{
    try {
        const salt=await bcrypt.genSalt(10)
        const hashcode=await bcrypt.hash(req.body.password,salt)

        const uploadImage=await cloudinary.uploader.upload(
            req.files.logo.tempFilePath
        )

        const newuser=new User({
            
            channelName:req.body.channelName,
            phone:req.body.phone,
            email:req.body.email,
            password:hashcode,
            logoUrl:uploadImage.secure_url,
            logoId:uploadImage.public_id
        })

        const user=await newuser.save()
        res.status(201).json({msg:'user created succesfully',user:user})
    } catch (error) {
        console.error(`error in signup ${error.message}`)
        res.status(500).json(`error in signup controller`)
    }
}

export const login=async(req,res)=>{
    try {
        const userexist=await User.findOne({email:req.body.email})
        if(!userexist) res.status(404).json(`user already exist`)
        
        const isvalid=await bcrypt.compare(req.body.password,userexist.password)
        if(!isvalid) res.status(404).json(`invalid email or password`)

        const token=jwt.sign({
            user_id:userexist._id,
            channelName:userexist.channelName,
            email:userexist.email,
            phone:userexist.phoone,
            logoId:userexist.logoId,
        },process.env.JWT_TOKEN,{expiresIn:"10d"})

        res.status(200).json({
             channelName:userexist.channelName,
            email:userexist.email,
            phone:userexist.phoone,
            logoId:userexist.logoId,
            logoUrl:userexist.logoUrl,
            token:token,
            subscribers:userexist.subscribers,
            subscribedChannels:userexist.subscribedChannels,
        })
    } catch (error) {
        console.error(`error in login ${error.message}`)
        res.status(500).json(`error in login`)
    }
}

export const getAllUser=async(req,res)=>{
    try {
        const users=await User.find()
        res.status(201).json(users)
    } catch (error) {
        console.error(`error in getalluser ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const subscribe=async(req,res)=>{
    try {
        const channelId = req.params.id // userId = current user, channelId = channel to subscribe to

        if ( req.user.user_id === channelId) {
        return res.status(400).json({ error: "You cannot subscribe to yourself" });
        }

        // Add the channel to user's subscribed channels
        await User.findByIdAndUpdate(req.user.user_id , {
        $addToSet: { subscribedChannels: channelId },
        });

        // Increment subscriber count
        await User.findByIdAndUpdate(channelId, {
        $inc: { subscribers: 1 },
        });

        res.status(200).json({ message: "Subscribed successfully" });
    } catch (error) {
        console.error("Subscription Error:", error.message);
        res.status(500).json(error.message );
    }
}

export const unSubscribe=async(req,res)=>{
    try {
        const channelId = req.params.id // userId = current user, channelId = channel to subscribe to

        if ( req.user.user_id === channelId) {
        return res.status(400).json({ error: "You cannot subscribe to yourself" });
        }

        // Add the channel to user's subscribed channels
        await User.findByIdAndUpdate(req.user.user_id , {
        $pull: { subscribedChannels: channelId },
        });

        // Increment subscriber count
        await User.findByIdAndUpdate(channelId, {
        $inc: { subscribers: -1 },
        });

        res.status(200).json({ message: "unSubscribed successfully" });
    } catch (error) {
        console.error("Subscription Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

