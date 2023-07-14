const UserService = require("../services/user.service.js");
const jwt = require("jsonwebtoken");

// User의 컨트롤러(Controller) 역할을 하는 클래스
class UserController {
  userService = new UserService(); // User 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당한다.

  // 회원가입
  signupUser = async (req, res, next) => {
    try {
      const { nickname, password, confirmPassword } = req.body; // 요청 body에서 nickname, password, confirmPassword 값을 가져올 것이다.
      // password, confirmpassword 값 확인
      if (password !== confirmPassword) {
        return res
          .status(412)
          .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
      }

      // 닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성 확인
      if (!nickname.match(/^[a-zA-Z0-9]{3,50}$/)) {
        return res.status(412).json({
          errorMessage:
            "닉네임은 영어와 숫자만 포함한 3자리 이상의 문자로 입력해주세요.",
        });
      }

      // 닉네임과 비밀번호가 같은 경우 회원가입 실패
      if (nickname === password) {
        return res
          .status(412)
          .json({ errorMessage: "닉네임과 비밀번호는 같을 수 없습니다." });
      }

      // 비밀번호가 4글자 이하인 경우
      if (password.length < 4) {
        return res
          .status(412)
          .json({ errorMessage: "비밀번호는 4자리 이상 입력해주세요." });
      }

      await this.userService.createUser(nickname, password);
      return res.status(201).json({ Message: "회원가입에 성공하였습니다." });
    } catch (error) {
      console.log(error);

      return res
        .status(400)
        .json({ errorMessage: "회원가입 도중 오류가 발생했습니다." });
    }
  };

  // 로그인
  loginUser = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;

      const userNickname = await this.userService.findUser(nickname, password);

      // 유저를 찾았는지 여부와 패스워드 일치여부를 검사하여 error 처리를 한다.
      if (!userNickname || password !== userNickname.password) {
        return res.status(412).json({
          error: "닉네임 또는 패스워드를 확인해주세요.",
        });
      }

      const token = jwt.sign(
        { userId: userNickname.userId },
        "customized-secret-key"
      );
      res.cookie("Authorization", `Bearer ${token}`);
      res.status(200).json({ token, message: "로그인이 되었습니다." });
    } catch (error) {
      console.log(error);

      res
        .status(400)
        .json({ errorMessage: "로그인 도중 오류가 발생하였습니다." });
    }
  };
}

module.exports = UserController;
