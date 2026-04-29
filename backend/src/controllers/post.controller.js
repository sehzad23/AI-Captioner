const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");
const postModel = require("../models/post.model");

async function createPostController(req, res) {
  console.log("📸 CREATE POST HIT");
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "File required",
      });
    }

    // Gemini Caption
    // const caption = await generateCaption(file.buffer);

    let caption = "Caption unavailable";

    try {
      caption = await generateCaption(file.buffer);
    } catch (error) {
      console.log("Gemini failed:", error.message);
    }

    // Upload ImageKit
    const result = await uploadFile(file.buffer.toString("base64"), uuidv4());

    const post = await postModel.create({
      caption: caption,
      image: result.url,
      user: req.user._id,
    });

    // Proper JSON Response
    return res.status(200).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log("ERROR:", error);

    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
}

module.exports = { createPostController };
