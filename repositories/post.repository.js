const { Users, Posts } = require("../models");

class PostRepository {
  findAllPosts = async () => {
    const posts = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["nickname"],
          as: "User",
        },
      ],
    });

    return posts;
  };

  createPost = async (userId, title, content) => {
    const createPostData = await Posts.create({
      UserId: userId,
      title,
      content,
    });

    return createPostData;
  };
}

module.exports = PostRepository;
