const PostService = require("../services/post.service.js");

// Post의 컨트롤러(Controlla) 역할을 하는 클래스
class PostController {
  postService = new PostService(); // PostService를 Controlla 클래스의 멤버 변수로 할당한다.

  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행한다.
    try {
      const posts = await this.postService.findAllPost();

      res.status(200).json({ data: posts });
    } catch (error) {
      res.status(400).json({ error: "게시글 조회에 실패했습니다." });
    }
  };

  createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const { userId } = res.locals.user;
    // 서비스 계층의 구현된 createPost 로직을 실행한다.

    try {
      const createPostData = await this.postService.createPost(
        userId,
        title,
        content
      );

      res.status(201).json({ posts: "게시글 작성에 성공하였습니다." });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "게시글 작성에 실패했습니다." });
    }
  };
}

module.exports = PostController;
