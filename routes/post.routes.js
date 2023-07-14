const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const PostController = require("../controllers/post.controller.js");
const postController = new PostController();

router.get("/posts", postController.getPosts);
router.get("/posts/:postId", postController.getOnePost);
router.post("/posts", authMiddleware, postController.createPost);
router.patch("/posts/:postId", authMiddleware, postController.updatePost);
router.delete("/posts/:postId", authMiddleware, postController.deletePost);

module.exports = router;
