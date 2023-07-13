const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const CommentController = require("../controllers/comment.controller.js");
const commentController = new CommentController();

router.get("/posts/:postId/comments", commentController.getCmt);
router.post(
  "/posts/:postId/comments",
  authMiddleware,
  commentController.createCmt
);
router.put(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  commentController.updateCmt
);
router.delete(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  commentController.deleteCmt
);

module.exports = router;
