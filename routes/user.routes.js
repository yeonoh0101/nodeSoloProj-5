const express = require("express"); // express 모듈을 가져온다.
const router = express.Router(); // router 객체를 생성한다.

const UserController = require("../controllers/user.controller.js");
const userController = new UserController();

router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);

module.exports = router; // router객체를 모듈로 내보낸다
