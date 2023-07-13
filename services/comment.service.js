const CommentRepository = require("../repositories/comment.repository.js");

class CommentService {
  commentRepository = new CommentRepository();
  // 댓글 조회
  findAllCmt = async (postId) => {
    const allCmt = await this.commentRepository.findAllCmts(postId);

    // 호출한 Post들을 가장 최신 게시글 부터 정렬한다.
    allCmt.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allCmt;
  };

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

  // 댓글 수정

  // 게시글 조회
  findPost = async (postId) => {
    const post = await this.commentRepository.findPost(postId);
    return post;
  };

  // 댓글 조회
  findComment = async (commentId) => {
    const comment = await this.commentRepository.findComment(commentId);
    return comment;
  };

  // 수정
  updateCmt = async (commentId, content) => {
    const updateCmt = await this.commentRepository.updateCmt(
      commentId,
      content
    );
    return updateCmt;
  };

  // 댓글 삭제

  // 게시글 조회
  findPost = async (postId) => {
    const post = await this.commentRepository.findPost(postId);
    return post;
  };

  // 댓글 조회
  findComment = async (commentId) => {
    const comment = await this.commentRepository.findComment(commentId);
    return comment;
  };

  // 삭제
  deleteCmt = async (postId, commentId) => {
    await this.commentRepository.deleteCmt(postId, commentId);
  };
}

module.exports = CommentService;
