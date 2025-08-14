import mongoose from "mongoose";

export const dbConnect=()=>{
    try {
        const url=mongoose.connect(process.env.MONGO_URI,
            {
                dbName:'Youtube_API'
            }
        )
        console.log(`mongodb is connected succesfully `)
    } catch (error) {
        console.error(`error in connecting db ${error.message}`)
    }
}