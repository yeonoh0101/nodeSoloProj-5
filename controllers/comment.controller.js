const CommentService = require("../services/comment.service.js");

class CommentController {
  commentService = new CommentService();

  // 댓글 조회
  getCmt = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const comment = await this.commentService.findAllCmt(postId);

      res.status(200).json({ data: comment });
    } catch (error) {
      res.status(404).json({ error: "댓글 조회에 실패하였습니다." });
    }
  };

  // 댓글 작성
  createCmt = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId, nickname } = res.locals.user;
      const { content } = req.body;

      if (!content) {
        return res
          .status(400)
          .json({ success: false, errorMessage: "댓글 내용을 입력해주세요." });
      }

      const createCmtData = await this.commentService.createCmt(
        postId,
        userId,
        nickname,
        content
      );
      res.status(201).json({ comments: "댓글을 작성하였습니다." });
    } catch (error) {
      res.status(400).json({ error: "댓글 작성에 실패했습니다." });
    }
  };
}

module.exports = CommentController;
