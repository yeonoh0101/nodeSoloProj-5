const LikeRepository = require("../repositories/like.repository.js");

class LikeService {
  likeRepository = new LikeRepository();

  // 게시글 조회
  findPost = async (postId) => {
    const post = await this.likeRepository.findPost(postId);
    return post;
  };

  // 좋아요 조회
  findLike = async (userId, postId) => {
    const like = await this.likeRepository.findLike(userId, postId);
    return like;
  };

  // Likes 컬럼에 +1
  increaseLike = async (postId) => {
    await this.likeRepository.increaseLike(postId);
  };

  // 좋아요 추가
  createLike = async (userId, postId) => {
    await this.likeRepository.createLike(userId, postId);
  };

  // Likes 컬럼에 -1
  decreaseLike = async (postId) => {
    await this.likeRepository.decreaseLike(postId);
  };

  // 좋아요 취소
  deleteLike = async (userId, postId) => {
    await this.likeRepository.deleteLike(userId, postId);
  };

  // 좋아요 게시글 조회
  getLikePosts = async (userId) => {
    // 사용자가 좋아요한 게시물  userId로 조회
    const likePostId = await this.likeRepository.getLikePostId(userId);

    // 사용자가 좋아요한 게시물을 조회
    const likedPosts = await this.likeRepository.getPostId(likePostId);

    // 조회된 좋아요한 게시물 목록을 변환
    const allLikePosts = likedPosts.map((post) => ({
      nickname: post.User.nickname,
      title: post.title,
      likes: post.likes,
      createdAt: post.createdAt,
    }));

    return allLikePosts;
  };
}

module.exports = LikeService;
