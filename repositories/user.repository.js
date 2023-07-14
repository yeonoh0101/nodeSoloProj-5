const { Users } = require("../models");

class UserRepository {
  createUser = async (nickname, password) => {
    const createUserData = await Users.create({ nickname, password });

    return createUserData;
  };
}

module.exports = UserRepository;
