const UserRepository = require("../repositories/user.repository.js");

class UserService {
  userRepository = new UserRepository();

  createUser = async (nickname, password) => {
    const createUserData = await this.userRepository.createUser(
      nickname,
      password
    );
    return createUserData;
  };

  findUser = async (nickname) => {
    const findUser = await this.userRepository.findUser(nickname);
    return findUser;
  };
}

module.exports = UserService;
