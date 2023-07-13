const PostRepository = require("../repositories/post.repository.js");

class PostService {
  postRepository = new PostRepository();

  // 전체 게시글 조회
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

  // 게시글 수정
  updatePost = async (postId, userId, title, content) => {
    const post = await this.postRepository.findPostId(postId);

    // 게시물이 없다면
    if (!post) {
      throw new Error("게시물을 찾을 수 없습니다.");
    }

    // 게시글 수정하려는 유저와 게시글 작성한 유저 Id가 다르다면
    if (post.UserId !== userId) {
      throw new Error("접근이 허용되지 않습니다.");
    }

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
  deletePost = async (postId, userId) => {
    const post = await this.postRepository.findPostId(postId);

    if (!post) {
      throw new Error("게시글이 존재하지 않습니다.");
    }

    if (post.UserId !== userId) {
      throw new Error("게시글의 삭제 권한이 존재하지 않습니다.");
    }

    await this.postRepository.deletePost(postId);
  };
}

module.exports = PostService;
