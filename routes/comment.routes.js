const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const CommentController = require("../controllers/comment.controller.js");
const commentController = new CommentController();

// 댓글 조회 API
router.get("/posts/:postId/comments", commentController.getCmt);
// 댓글 작성 API
router.post(
  "/posts/:postId/comments",
  authMiddleware,
  commentController.createCmt
);
// 댓글 수정 API
router.put(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  commentController.updateCmt
);
// 댓글 삭제 API
router.delete(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  commentController.deleteCmt
);

module.exports = router;
