const mongoose = require("mongoose")

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      REF: "users",
      unique: true,
    },
    followee: {
      type: mongoose.Schema.Types.ObjectId,
      REF: "users",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const followmodel = mongoose.model("follows", followSchema)

module.exports = followmodel