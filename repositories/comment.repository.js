const { Posts, Comments } = require("../models");
const { Op } = require("sequelize");

class CommentRepository {
  // 댓글 조회
  findAllCmts = async (postId) => {
    const comments = await Comments.findAll({ where: { postId } });

    return comments;
  };

  // 댓글 작성
  createCmt = async (postId, userId, nickname, content) => {
    await Comments.create({
      PostId: postId,
      UserId: userId,
      nickname,
      content,
    });
  };

  // 게시글 조회
  findPost = async (postId) => {
    const post = await Posts.findOne({ where: { postId } });
    return post;
  };

  // 댓글 조회
  findComment = async (commentId) => {
    const comment = await Comments.findOne({ where: { commentId } });
    return comment;
  };

  // 댓글 수정
  updateCmt = async (commentId, content) => {
    const updatedComment = await Comments.update(
      { content },
      { where: { commentId } }
    );
    return updatedComment;
  };

  // 댓글 삭제
  deleteCmt = async (postId, commentId) => {
    await Comments.destroy({
      where: {
        [Op.and]: [{ postId }, { commentId }], // commentId와 postId를 기준으로 삭제한다.
      },
    });
  };
}

module.exports = CommentRepository;
