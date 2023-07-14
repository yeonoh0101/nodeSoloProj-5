const { Users, Posts } = require("../models");

class PostRepository {
  // 전체 게시글 조회
  findAllPosts = async () => {
    const posts = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["nickname"],
          as: "User",
        },
      ],
      order: [["createdAt", "desc"]],
    });

    return posts;
  };

  // 게시글 상세 조회
  findOnePost = async (postId) => {
    const post = await Posts.findOne({
      where: { postId },
      include: [
        {
          model: Users,
          attributes: ["nickname"],
          as: "User",
        },
      ],
    });

    return post;
  };

  // 게시글 작성
  createPost = async (userId, title, content) => {
    const createPostData = await Posts.create({
      UserId: userId,
      title,
      content,
    });

    return createPostData;
  };

  // postId를 기준으로 해당하는 게시물의 존재 여부를 확인
  findPostId = async (postId) => {
    const post = await Posts.findOne({ where: { postId } });

    return post;
  };

  // 게시글 수정
  updatePost = async (postId, updatedPost) => {
    await Posts.update(updatedPost, { where: { postId } });
  };

  // 게시글 삭제
  deletePost = async (postId) => {
    await Posts.destroy({ where: { postId } });
  };
}

module.exports = PostRepository;
