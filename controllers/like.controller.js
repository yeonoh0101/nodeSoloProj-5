const LikeService = require("../services/like.service.js");

class LikeController {
  likeService = new LikeService();

  // 좋아요 추가, 취소
  updateDeleteLike = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;

      // 게시글 존재여부 확인
      const post = await this.likeService.findPost(postId);
      if (!post) {
        return res
          .status(404)
          .json({ errorMessage: "게시글을 찾을 수 없습니다." });
      }

      // 좋아요 확인
      const likes = await this.likeService.findLike(userId, postId);

      // 좋아요 추가
      if (!likes) {
        await this.likeService.increaseLike(postId);
        await this.likeService.createLike(userId, postId);
        return res
          .status(200)
          .json({ message: "게시글의 좋아요를 등록하였습니다." });
      }

      // 좋아요 취소
      if (likes) {
        await this.likeService.decreaseLike(postId);
        await this.likeService.deleteLike(userId, postId);
        return res
          .status(200)
          .json({ message: "게시글의 좋아요를 취소하였습니다." });
      }
    } catch (error) {
      return res.status(400).json({ errorMessage: "오류가 발생하였습니다." });
    }
  };

  // 내가 좋아요 달은 게시물 조회
  getLikes = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;

      const { allLikesPosts } = await this.likeService.getLikePosts(userId);

      return res.status(200).json({ posts: allLikesPosts });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: "좋아요 게시글 조회에 실패하였습니다." });
    }
  };
}

module.exports = LikeController;
