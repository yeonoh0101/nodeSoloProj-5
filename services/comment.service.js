const CommentRepository = require("../repositories/comment.repository.js");

class CommentService {
  commentRepository = new CommentRepository();

  // 댓글 작성
  createCmt = async (postId, userId, nickname, content) => {
    const createCmt = await this.commentRepository.createCmt(
      postId,
      userId,
      nickname,
      content
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공한다.
    return createCmt;
  };
}

module.exports = CommentService;
