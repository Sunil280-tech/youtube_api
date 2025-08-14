import { Router } from "express";

import {signUp,login, getAllUser, subscribe, unSubscribe} from "../controller/user.controller.js"
import { checkAuth } from "../middleware/auth.middleware.js";

export const userRoute=Router()

userRoute.post('/signup',signUp)
userRoute.post(`/login`,login)
userRoute.get(`/`,checkAuth,getAllUser)
userRoute.put(`/sub/:id`,checkAuth,subscribe)
userRoute.put(`/unsub/:id`,checkAuth,unSubscribe)