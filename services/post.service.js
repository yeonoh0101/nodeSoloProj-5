const PostRepository = require("../repositories/post.repository.js");

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청한다.
    const allPost = await this.postRepository.findAllPosts();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬한다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공한다.
    return allPost.map((post) => {
      return {
        postId: post.postId,
        UserId: post.UserId,
        nickname: post.User.nickname,
        title: post.title,
        content: post.content,
        likes: post.likes,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  createPost = async (userId, title, content) => {
    // 저장소(Repository)에게 데이터를 요청한다.
    const createPostData = await this.postRepository.createPost(
      userId,
      title,
      content
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공한다.
    return createPostData;
  };
}

module.exports = PostService;
