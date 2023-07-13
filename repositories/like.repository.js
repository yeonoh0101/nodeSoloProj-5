const { Users, Posts, Likes } = require("../models");
const { Op } = require("sequelize");

class LikeRepository {
  // 게시글 조회
  findPost = async (postId) => {
    const post = await Posts.findOne({ where: { postId } });
    return post;
  };

  // 좋아요 조회
  findLike = async (userId, postId) => {
    const like = await Likes.findOne({
      where: {
        [Op.and]: [{ userId }, { postId }], // userId와 postId를 기준으로 조회한다.
      },
    });
    console.log(like);
    return like;
  };

  // Likes 컬럼에 +1
  increaseLike = async (postId) => {
    const post = await Posts.findOne({ where: { postId } });
    await Posts.update(
      { likes: post.likes + 1 },
      { where: { postId: post.postId } }
    );
  };

  // 좋아요 추가
  createLike = async (userId, postId) => {
    await Likes.create({ UserId: userId, PostId: postId });
  };

  // likes 컬럼에 -1
  decreaseLike = async (postId) => {
    const post = await Posts.findOne({ where: { postId } });
    await Posts.update(
      { likes: post.likes - 1 },
      { where: { postId: post.postId } }
    );
  };

  // 좋아요 취소
  deleteLike = async (userId, postId) => {
    await Likes.destroy({
      where: {
        [Op.and]: [{ userId }, { postId }],
      },
    });
  };

  // 사용자가 좋아요한 게시물 ID 조회
  async getLikePostId(userId) {
    const likePostId = await Likes.findAll({
      where: { UserId: userId },
      attributes: ["PostId"],
    });

    return likePostId.map((item) => item.PostId);
  }

  // 사용자가 좋아요한 게시물을 조회
  async getPostId(postId) {
    const likePosts = await Posts.findAll({
      where: { postId: postId },
      order: [["likes", "DESC"]],
      include: [
        {
          model: Users,
          attributes: ["nickname"],
          as: "User",
        },
      ],
    });

    return likePosts;
  }
}

module.exports = LikeRepository;
