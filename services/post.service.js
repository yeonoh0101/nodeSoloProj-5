const PostRepository = require("../repositories/post.repository.js");

class PostService {
  postRepository = new PostRepository();

  // 전체 게시글 조회
  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청한다.
    const allPost = await this.postRepository.findAllPosts();

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

  // 게시글 상세 조회
  findOnePost = async (postId) => {
    // 저장소(Repository)에게 데이터를 요청한다.
    const post = await this.postRepository.findOnePost(postId);

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공한다.
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
  };

  // 게시글 작성
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

  // postId를 기준으로 해당하는 게시물의 존재 여부를 확인
  findPostId = async (postId) => {
    const findPostId = this.postRepository.findPostId(postId);
    return findPostId;
  };

  // 게시글 수정
  updatePost = async (postId, title, content) => {
    const updatedPost = {};

    if (title) {
      updatedPost.title = title;
    }
    if (content) {
      updatedPost.content = content;
    }

    const newPost = await this.postRepository.updatePost(postId, updatedPost);
    return newPost;
  };

  // 게시글 삭제
  deletePost = async (postId) => {
    await this.postRepository.deletePost(postId);
  };
}

module.exports = PostService;
