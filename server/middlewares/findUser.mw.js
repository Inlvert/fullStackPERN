const { User } = require("../models");

module.exports.findUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const user = await User.findByPk(userId);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
