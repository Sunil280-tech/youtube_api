import { Router } from "express";
import {checkAuth} from "../middleware/auth.middleware.js"
import { delCmt, findByVideoId, getAllCmt, postCmt, updateCmt } from "../controller/comment.controller.js";

export const commentRoute=Router()

//post,delete,edit,get,getall
commentRoute.post("/",checkAuth,postCmt)
commentRoute.delete("/:id",checkAuth,delCmt)
commentRoute.get("/",getAllCmt)
commentRoute.get("/video/:id",checkAuth,findByVideoId)
commentRoute.put("/:id",checkAuth,updateCmt)
