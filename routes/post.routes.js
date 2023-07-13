const express = require("express");
const router = express.Router();

const PostController = require("../controllers/post.controller.js");
const postController = new PostController();

const authMiddleware = require("../middlewares/auth-middleware");
router.get("/posts", postController.getPosts);
router.post("/posts", authMiddleware, postController.createPost);

module.exports = router;
