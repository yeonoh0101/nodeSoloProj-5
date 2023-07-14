const { Users } = require("../models");

class UserRepository {
  createUser = async (nickname, password) => {
    const createUserData = await Users.create({ nickname, password });
    return createUserData;
  };

  findUser = async (nickname, password) => {
    const findUser = await Users.findOne({ where: { nickname, password } });
    return findUser;
  };
}

module.exports = UserRepository;
