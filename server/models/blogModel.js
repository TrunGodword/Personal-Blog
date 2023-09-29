const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
  }, {
    timestamps: true,
  });

const blogModel = mongoose.model("blog", blogSchema)
module.exports = blogModel