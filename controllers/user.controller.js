const UserService = require("../services/user.service.js");

// User의 컨트롤러(Controller) 역할을 하는 클래스
class UserController {
  userService = new UserService(); // User 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당한다.

  signupUser = async (req, res, next) => {
    const { nickname, password, confirmPassword } = req.body; // 요청 body에서 nickname, password, confirmPassword 값을 가져올 것이다.

    try {
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
}

module.exports = UserController;
