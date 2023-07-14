const CommentService = require("../services/comment.service.js");

class CommentController {
  commentService = new CommentService();

  // 댓글 조회
  getCmt = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const comment = await this.commentService.findAllCmt(postId); // params로 받은 postId 값 기준으로 댓글이 있는지 조회한다.

      // 댓글이 존재하지 않는 경우 errorMessage
      if (!comment.length) {
        return res
          .status(400)
          .json({ errorMessage: "댓글이 존재하지 않습니다." });
      }

      res.status(200).json({ data: comment });
    } catch (error) {
      res.status(404).json({ errorMessage: "댓글 조회에 실패하였습니다." });
    }
  };

  // 댓글 작성
  createCmt = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId, nickname } = res.locals.user;
      const { content } = req.body;

      // 내용이 없는 경우 errorMessage
      if (!content) {
        return res
          .status(400)
          .json({ success: false, errorMessage: "댓글 내용을 입력해주세요." });
      }

      await this.commentService.createCmt(postId, userId, nickname, content);
      res.status(201).json({ comments: "댓글을 작성하였습니다." });
    } catch (error) {
      res.status(400).json({ errorMessage: "댓글 작성에 실패했습니다." });
    }
  };

  // 댓글 수정
  updateCmt = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { userId } = res.locals.user;
      const { content } = req.body;

      // 게시글 존재여부 확인
      const post = await this.commentService.findPost(postId);

      // 게시글 여부 확인
      if (!post) {
        return res
          .status(404)
          .json({ errorMessage: "게시글을 찾을 수 없습니다." });
      }
      // 댓글 존재여부 확인
      const comment = await this.commentService.findComment(commentId);
      if (!comment) {
        return res
          .status(404)
          .json({ errorMessage: "댓글을 찾을 수 없습니다." });
      }
      // 로그인 한 userId와 게시글 수정하려는 userId값이 같지 않다면
      if (userId !== comment.UserId) {
        return res
          .status(403)
          .json({ errorMessage: "접근이 허용되지 않습니다." });
      }
      // content를 작성안한 경우
      if (!content) {
        return res
          .status(400)
          .json({ success: false, errorMessage: "댓글 내용을 입력해주세요." });
      }

      await this.commentService.updateCmt(commentId, content);
      res.status(200).json({ data: "댓글 수정에 성공했습니다." });
    } catch (error) {
      res.status(400).json({ errorMessage: "댓글 수정에 실패하였습니다." });
    }
  };

  // 댓글 삭제
  deleteCmt = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { userId } = res.locals.user;

      // 게시글 존재여부 확인
      const post = await this.commentService.findPost(postId);
      if (!post) {
        return res
          .status(404)
          .json({ errorMessage: "게시글을 찾을 수 없습니다." });
      }
      // 댓글 존재여부 확인
      const comment = await this.commentService.findComment(commentId);
      if (!comment) {
        return res
          .status(404)
          .json({ errorMessage: "댓글을 찾을 수 없습니다." });
      }
      // 로그인 한 userId와 게시글 수정하려는 userId값이 같지 않다면
      if (userId !== comment.UserId) {
        return res
          .status(403)
          .json({ errorMessage: "접근이 허용되지 않습니다." });
      }

      await this.commentService.deleteCmt(postId, commentId);
      res.status(200).json({ message: "댓글을 삭제하였습니다." });
    } catch (error) {
      res.status(400).json({ errorMessage: "댓글 삭제에 실패했습니다." });
    }
  };
}

module.exports = CommentController;
