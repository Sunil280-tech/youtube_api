import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import path from "path"
import fs, { mkdir } from "fs"
import { fileURLToPath } from 'url';

import { dbConnect } from "./config/db.config.js"
import {userRoute} from "./routes/user.routes.js"
import { videoRoute } from "./routes/video.routes.js"
import { commentRoute } from "./routes/comment.routes.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempDir=path.join(__dirname,'tempDir')
if(!fs.existsSync(tempDir)){
    fs.mkdir(tempDir,(error)=>console.error(` error in mkdir ${error.message}`))
}

const app=express()
dotenv.config()
app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:tempDir
}))

dbConnect()

app.use("/api/user",userRoute)
app.use("/api/video",videoRoute)
app.use("/api/comment",commentRoute)

app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})

