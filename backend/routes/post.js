const router = require('express').Router();
const { v2 } = require("cloudinary");
const Post = require("../models/post");

v2.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Success",
      data: posts,
    });
  }
  catch (e) {
    return res.status(500).json({
      message: "Can\'t gat all post",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await v2.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    await newPost.save();

    return res.status(201).json({
      message: "Success",
      post: newPost,
    });
  }
  catch (e) {
    return res.status(500).json({
      message: "Can\'t create a post",
    });
  }
});

module.exports = router;