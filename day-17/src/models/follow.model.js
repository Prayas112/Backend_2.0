const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema(
  {
    follower: String,
    followee: String,
  },
  { timestamps: true },
);

FollowSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followmodel = mongoose.model("follows", FollowSchema);

module.exports = followmodel;
