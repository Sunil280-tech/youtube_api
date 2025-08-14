import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    video_id: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
    commentText: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // This will automatically add `createdAt` and `updatedAt` timestamps
);

export const Comment = mongoose.model("Comment", commentSchema);

