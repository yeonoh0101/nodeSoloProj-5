const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const PostController = require("../controllers/post.controller.js");
const postController = new PostController();

router.get("/posts", postController.getPosts); // 게시글 전체 조회 API
router.get("/posts/:postId", postController.getOnePost); // 게시글 상세 조회 API
router.post("/posts", authMiddleware, postController.createPost); // 게시글 작성 API
router.patch("/posts/:postId", authMiddleware, postController.updatePost); // 게시글 수정 API
router.delete("/posts/:postId", authMiddleware, postController.deletePost); // 게시글 삭제 API

module.exports = router;
