const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const LikeController = require("../controllers/like.controller.js");
const likeController = new LikeController();

router.put(
  "/posts/:postId/like",
  authMiddleware,
  likeController.updateDeleteLike
);
router.get("/likes/posts", authMiddleware, likeController.getLikes);

module.exports = router;
