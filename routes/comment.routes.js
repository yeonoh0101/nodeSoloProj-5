const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const CommentController = require("../controllers/comment.controller.js");
const commentController = new CommentController();

router.post(
  "/posts/:postId/comments",
  authMiddleware,
  commentController.createCmt
);

module.exports = router;
