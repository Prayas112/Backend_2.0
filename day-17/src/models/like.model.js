const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "post id is required for creating a like"],
    },
    user: {
      type: String,
      required: [true, "username is required for creating a like"],
    },
  },
  {
    timestamps: true,
  },
);


likeSchema.index({ post: 1, user: 1 }, { unique: true });


const likemodel = mongoose.model("likes",likeSchema)

module.exports = likemodel