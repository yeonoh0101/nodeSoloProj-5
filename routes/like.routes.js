const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const LikeController = require("../controllers/like.controller.js");
const likeController = new LikeController();

// 좋아요 추가, 취소 API
router.put(
  "/posts/:postId/like",
  authMiddleware,
  likeController.updateDeleteLike
);
// 내가 좋아요 달은 게시물 조회
router.get("/likes/posts", authMiddleware, likeController.getLikes);

module.exports = router;
