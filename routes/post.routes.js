const express = require("express");
const router = express.Router();

const PostController = require("../controllers/post.controller.js");
const postController = new PostController();

const authMiddleware = require("../middlewares/auth-middleware");
router.get("/posts", postController.getPosts);
router.get("/posts/:postId", postController.getPost);
router.post("/posts", authMiddleware, postController.createPost);
router.patch("/posts/:postId", authMiddleware, postController.updatePost);
router.delete("/posts/:postId", authMiddleware, postController.deletePost);

module.exports = router;