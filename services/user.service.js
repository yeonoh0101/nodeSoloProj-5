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
}

module.exports = UserService;
