const PostService = require("../services/post.service.js");

// Post의 컨트롤러(Controlla) 역할을 하는 클래스
class PostController {
  postService = new PostService(); // PostService를 Controlla 클래스의 멤버 변수로 할당한다.

  // 전체 게시글 조회
  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행한다.
    try {
      const posts = await this.postService.findAllPost();

      res.status(200).json({ data: posts });
    } catch (error) {
      res.status(400).json({ error: "게시글 조회에 실패했습니다." });
    }
  };

  // 게시글 상세 조회
  getOnePost = async (req, res, next) => {
    // 서비스 계층에 구현된 findOnePost 로직을 실행한다.
    const { postId } = req.params;
    try {
      const post = await this.postService.findOnePost(postId);

      res.status(200).json({ data: post });
    } catch (error) {
      res.status(400).json({ error: "게시글 조회에 실패했습니다." });
    }
  };

  // 게시글 작성
  createPost = async (req, res, next) => {
    // 서비스 계층의 구현된 createPost 로직을 실행한다.
    const { title, content } = req.body;
    const { userId } = res.locals.user;

    try {
      await this.postService.createPost(userId, title, content);
      res.status(201).json({ posts: "게시글 작성에 성공하였습니다." });
    } catch (error) {
      res.status(400).json({ error: "게시글 작성에 실패했습니다." });
    }
  };

  // 게시글 수정
  updatePost = async (req, res, next) => {
    // 서비스 계층에 구현된 updatePost 로직을 실행한다.
    const { postId } = req.params;
    const { title, content } = req.body;
    const { userId } = res.locals.user;

    try {
      await this.postService.updatePost(postId, userId, title, content);
      res.json({ message: "게시물 수정에 성공했습니다." });
    } catch (error) {
      res.status(500).json({ error: "게시물 수정에 실패했습니다." });
    }
  };

  // 게시글 삭제
  deletePost = async (req, res, next) => {
    // 서비스 계층에 구현된 deletePost 로직을 실행한다.
    const { postId } = req.params;
    const { userId } = res.locals.user;

    try {
      await this.postService.deletePost(postId, userId);
      res.status(200).json({ data: "게시글을 삭제하였습니다." });
    } catch (error) {
      res.status(401).json({ error: "게시글 삭제에 실패했습니다." });
    }
  };
}

module.exports = PostController;
