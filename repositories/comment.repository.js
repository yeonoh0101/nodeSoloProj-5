const { Comments } = require("../models");

class CommentRepository {
  // 댓글 작성
  createCmt = async (postId, userId, nickname, content) => {
    const createCmtData = await Comments.create({
      PostId: postId,
      UserId: userId,
      nickname,
      content,
    });
  };
}

module.exports = CommentRepository;
