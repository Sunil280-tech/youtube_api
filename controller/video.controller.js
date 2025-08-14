import cloudinary from "../config/cloudinary.config.js"
import { Video } from "../models/video.model.js"

export const uploadVideo=async(req,res)=>{
    try {
        const {title,description,category,tags}=req.body
        if(!req.files||!req.files.video||!req.files.thumbnail){
            return res.status(400).json(`video and thumbnail are required`)
        }
        const videoUpload=await cloudinary.uploader.upload(
            req.files.video.tempFilePath,
            {
                resource_type:"video",
                folder:"videos"
            }
        )
        const thumbnail=await cloudinary.uploader.upload(
            req.files.thumbnail.tempFilePath,
            {
                folder:"thumbnails"
            }
        )
        const newVideo=new Video({
            title,
            description,
            user_id:req.user.user_id,
            videoUrl:videoUpload.secure_url,
            videoId:videoUpload.public_id,
            thumbnailUrl:thumbnail.secure_url,
            thumbnailId:thumbnail.public_id,
            category,
            tags:tags?tags.split(","):[],
        })
        await newVideo.save();
        res.status(201).json({msg:`video uploaded succesfully`,newVideo})
    } catch (error) {
        console.log(`error in upload ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const updateVideo=async(req,res)=>{
    try {
        const {title,description,category,tags}=req.body
        const videoId=req.params.id
        let video=await Video.findById(videoId)
        if(!video){
            return res.status(404).json(`video not found`)
        }
        if(req.user.user_id.toString()!==video.user_id.toString()){
            return res.status(403).json(`unauthorized to update`)
        }
        if(req.files && req.files.thumbnail){
            await cloudinary.uploader.destroy(video.thumbnailId)
            const thumbnailUpload=await cloudinary.uploader.upload(
                req.files.thumbnail.tempFilePath,
                {
                    folder:"thumbnail"
                }
            )
            video.thumbnailId=thumbnailUpload.public_id
            video.thumbnailUrl=thumbnailUpload.secure_url
        }
        video.title=title||video.title;
        video.description=description||video.description;
        video.category=category||video.category;
        video.tags=tags||video.tags
        await video.save()
        return res.status(201).json({msg:`video updated succesfully`,video})
    } catch (error) {
        console.error(`error in updateVideo ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const deleteVideo=async(req,res)=>{
    try {
        const id=req.params.id
        const exist=await Video.findById(id)
        if(!exist){
            return res.status(404).json(`video not found`)
        }
        console.log(exist,req.user.user_id)
        if(req.user.user_id.toString()!==exist.user_id.toString()){
            return res.status(403).json(`not authorized to delete`)
        }
        await cloudinary.uploader.destroy(exist.videoId,{resource_type:"video"})
        await cloudinary.uploader.destroy(exist.thumbnailId)
        await Video.deleteOne({_id:exist._id})
        res.status(201).json(`video deleted succesfully`)
    } catch (error) {
        console.error(`error in deleteViddeo ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const getAllVideo=async(req,res)=>{
    try {
        const video=await Video.find().sort({createdAt:-1})
        res.status(200).json(video)
    } catch (error) {
        console.error(`error in getall ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const getMyVideo=async(req,res)=>{
    try {
        const video=await Video.find({user_id:req.user.user_id}).sort({createdAt:-1})
        res.status(200).json(video)
    } catch (error) {
        console.error(`error in getMyVideo ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const getVideoById=async(req,res)=>{
    try {
        const id=req.params.id
        const video=await Video.findById(id)
        if(!video){
            return res.status(401).json(`video not found`)
        }
        res.status(201).status(video)
    } catch (error) {
        console.error(`error in get video by id ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const view=async(req,res)=>{
    try {
        const vid_id=req.params.id
        const user_id=req.user.user_id
        const video=await Video.findByIdAndUpdate(
            vid_id,
            {
                $addToSet: { viewedBy: user_id }, 
            },
            {new:true}
        )
        if(!video){
            return res.status(404).json(`video not found`)
        }
        res.status(200).json(video)
    } catch (error) {
        console.error(`error in view video by id ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const getVideoByCat=async(req,res)=>{
    try {
        const cat=req.params.category
        const video=await Video.find({category:cat}).sort({createdAt:-1})
        res.status(400).json(video)
    } catch (error) {
        console.error(`error in get by cat ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const getVideoByTag=async(req,res)=>{
    try {
        const tag=req.params.tags
        const video=await Video.find({tags:tag}).sort({createdAt:-1})
        res.status(400).json(video)
    } catch (error) {
        console.error(`error in get by tag ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const likeVideo=async(req,res)=>{
    try {
        const videoId=req.params.id
        const video=await Video.findByIdAndUpdate(
            videoId,
            {
                $addToSet:{likedBy:req.user.user_id},
                $pull:{dislikedBy:req.user.user_id}
            },
            {new:true}
        )
        if(!video){
            return res.status(200).json(`video not found`)
        }
        res.status(400).json(`video liked by ${req.user.channelName}`)
    } catch (error) {
        console.error(`error in liked video ${error.message}`)
        res.status(500).json(error.message) 
    }
}

export const dislikeVideo=async(req,res)=>{
    try {
        const videoId=req.params.id
        const video=await Video.findByIdAndUpdate(
            videoId,
            {
                $addToSet:{dislikedBylikedBy:req.user.user_id},
                $pull:{likedBy:req.user.user_id}
            }
        )
        if(!video){
            return res.status(200).json(`video not found`)
        }
        res.status(400).json(`video liked by ${req.user.channelName}`)
    } catch (error) {
        console.error(`error in liked video ${error.message}`)
        res.status(500).json(error.message) 
    }
}