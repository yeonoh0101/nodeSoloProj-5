const PostService = require("../services/post.service.js");

// Post의 컨트롤러(Controlla) 역할을 하는 클래스
class PostController {
  postService = new PostService(); // PostService를 Controlla 클래스의 멤버 변수로 할당한다.

  // 전체 게시글 조회
  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행한다.
    try {
      const posts = await this.postService.findAllPost(); // 게시글 전체 데이터를 받아온다.

      if (!posts.length) {
        return res
          .status(400)
          .json({ errorMessage: "게시글이 존재하지 않습니다." });
      }

      res.status(200).json({ data: posts });
    } catch (error) {
      res.status(400).json({ errorMessage: "게시글 조회에 실패했습니다." });
    }
  };

  // 게시글 상세 조회
  getOnePost = async (req, res, next) => {
    // 서비스 계층에 구현된 findOnePost 로직을 실행한다.
    try {
      const { postId } = req.params;
      const post = await this.postService.findOnePost(postId); // params로 받아온 postId와 일치한 게시글 데이터를 받아온다.

      res.status(200).json({ data: post });
    } catch (error) {
      res
        .status(400)
        .json({ errorMessage: "헤딩 게시글 조회에 실패했습니다." });
    }
  };

  // 게시글 작성
  createPost = async (req, res, next) => {
    // 서비스 계층의 구현된 createPost 로직을 실행한다.
    try {
      const { title, content } = req.body;
      const { userId } = res.locals.user;

      // 제목이 없다면
      if (!title) {
        return res.status(400).json({ errorMessage: "제목을 입력해주세요." });
      }
      // 내용이 없다면
      if (!content) {
        return res.status(400).json({ errorMessage: "내용을 입력해주세요." });
      }

      await this.postService.createPost(userId, title, content);
      res.status(201).json({ posts: "게시글 작성에 성공하였습니다." });
    } catch (error) {
      res.status(400).json({ errorMessage: "게시글 작성에 실패했습니다." });
    }
  };

  // 게시글 수정
  updatePost = async (req, res, next) => {
    // 서비스 계층에 구현된 updatePost 로직을 실행한다.
    try {
      const { postId } = req.params;
      const { title, content } = req.body;
      const { userId } = res.locals.user;

      // postId를 기준으로 해당하는 게시물의 존재 여부를 확인
      const post = await this.postService.findPostId(postId);

      // 게시물이 없다면
      if (!post) {
        return res
          .status(404)
          .json({ errorMessage: "게시물을 찾을 수 없습니다." });
      }
      // 게시글 수정하려는 유저와 게시글 작성한 유저 Id가 다르다면
      if (post.UserId !== userId) {
        return res
          .status(400)
          .json({ errorMessage: "접근이 허용되지 않습니다." });
      }
      // 제목이 없다면
      if (!title) {
        return res.status(400).json({ errorMessage: "제목을 입력해주세요." });
      }
      // 내용이 없다면
      if (!content) {
        return res.status(400).json({ errorMessage: "내용을 입력해주세요." });
      }

      await this.postService.updatePost(postId, userId, title, content);
      res.json({ message: "게시물 수정에 성공했습니다." });
    } catch (error) {
      res.status(500).json({ errorMessage: "게시물 수정에 실패했습니다." });
    }
  };

  // 게시글 삭제
  deletePost = async (req, res, next) => {
    // 서비스 계층에 구현된 deletePost 로직을 실행한다.
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;

      // postId를 기준으로 해당하는 게시물의 존재 여부를 확인
      const post = await this.postService.findPostId(postId);

      // 게시물이 없다면
      if (!post) {
        return res
          .status(404)
          .json({ errorMessage: "게시물을 찾을 수 없습니다." });
      }
      // 게시글 수정하려는 유저와 게시글 작성한 유저 Id가 다르다면
      if (post.UserId !== userId) {
        return res
          .status(400)
          .json({ errorMessage: "접근이 허용되지 않습니다." });
      }

      await this.postService.deletePost(postId, userId);
      res.status(200).json({ errorMessage: "게시글을 삭제하였습니다." });
    } catch (error) {
      res.status(401).json({ errorMessage: "게시글 삭제에 실패했습니다." });
    }
  };
}

module.exports = PostController;
