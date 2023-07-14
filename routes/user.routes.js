const express = require("express"); // express 모듈을 가져온다.
const router = express.Router(); // router 객체를 생성한다.

const UserController = require("../controllers/user.controller.js");
const userController = new UserController();

router.post("/signup", userController.signupUser); // 회원가입 API
router.post("/login", userController.loginUser); // 로그인 API

module.exports = router; // router객체를 모듈로 내보낸다
