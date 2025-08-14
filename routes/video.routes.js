import { Router } from "express";

import { checkAuth } from "../middleware/auth.middleware.js";
import {deleteVideo, dislikeVideo, getAllVideo, getMyVideo, getVideoByCat, getVideoById, getVideoByTag, likeVideo, updateVideo, uploadVideo, view} from "../controller/video.controller.js"
export const videoRoute=Router();

videoRoute.post("/upload",checkAuth,uploadVideo)
videoRoute.put("/update/:id",checkAuth,updateVideo)
videoRoute.delete("/:id",checkAuth,deleteVideo)
videoRoute.get("/all",getAllVideo)
videoRoute.get("/",checkAuth,getMyVideo)
videoRoute.get("/:id",checkAuth,getVideoById)
videoRoute.get("/view/:id",checkAuth,view)
videoRoute.get("/cat/:category",checkAuth,getVideoByCat)
videoRoute.get("/tag/:tags",checkAuth,getVideoByTag)
videoRoute.get("/like/:id",checkAuth,likeVideo)
videoRoute.get("/dislike",checkAuth,dislikeVideo)
