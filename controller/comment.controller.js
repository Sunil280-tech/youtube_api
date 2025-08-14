import { Comment } from "../models/comment.model.js";
import {Video} from "../models/video.model.js"

export const postCmt=async(req,res)=>{
    try {
        const {video_id,commentText}=req.body
        if(!video_id || !commentText){
            return res.status(401).json(`each field is required`)
        }
        const vid=await Video.findById(video_id)
        if(!vid){
            return res.status(401).json(`video not found`)
        }
        const cmt=new Comment({
            video_id,
            commentText,
            user_id:req.user.user_id,
        })
        await cmt.save()
        res.status(400).json(`${req.user.channelName} has commented`)
    } catch (error) {
        console.error(`error in postcmt`)
        res.status(500).json(`${error.message}`)
    }
} 

export const delCmt=async(req,res)=>{
    try {
        const id=req.params.id
        const cmt=await Comment.findById(id)
        if(!cmt){
            return res.status(403).json(`invalid id`)
        }
        if(cmt.user_id.toString()!==req.user.user_id.toString()){
            return res.status(403).json(`unauthorized`)
        }
        await Comment.findByIdAndDelete(id)
        res.status(400).json(`comment deleted succesfully`)
    } catch (error) {
        console.error(`error in delcmt ${error.message}`)
        res.status(500).json(`${error.message}`) 
    }
}

export const getAllCmt=async(req,res)=>{
    try {
        const cmt=await Comment.find().populate('user_id','channelName').sort({createdAt:-1})
        res.status(400).json(cmt)
    } catch (error) {
        console.error(`error in delcmt`)
        res.status(500).json(`${error.message}`)  
    }
}

export const updateCmt=async(req,res)=>{
    try {
        const id=req.params.id
        const text=req.body.text
        const cmt=await Comment.findById(id)
        if(!cmt){
            return res.status(401).json(`invalid id`)
        }
        if(cmt.user_id.toString()!==req.user.user_id.toString()){
            return res.status(400).json(`unauthorized`)
        }
        cmt.commentText=text
        await cmt.save()
        res.status(400).json(`comment updated succesfully`)
    } catch (error) {
        console.error(`error in updateCmt ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const findByVideoId=async(req,res)=>{
    try {
        const v_id=req.params.id
        const cmt=await Comment.find({video_id:v_id})
        const totalcmt=await Comment.countDocuments({video_id:v_id})
        res.status(400).json({comments:cmt,total_comment:totalcmt})
    } catch (error) {
        console.error(`error in find by video id`)
        res.status(500).json(`error in findby video id`)
    }
}