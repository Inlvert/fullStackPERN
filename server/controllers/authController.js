const createHttpError = require("http-errors");
const { User, Cart } = require("../models");
const AuthService = require("../services/auth.service");
const { where } = require("sequelize");

module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    const userWithTokens = await AuthService.createSession(user);

    console.log(userWithTokens);

    // send on front
    res.status(201).send({
      data: { ...userWithTokens },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    //find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(createHttpError(404, "invalid data for user"));
    }

    if (user.password !== password) {
      return next(createHttpError(404, "invalid data for user"));
    }

    const userWithTokens = await AuthService.createSession(user);

    console.log(user);

    // send on front

    res.send({ data: userWithTokens });
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const { tokenInstance } = req;

    const userWithTokens = await AuthService.refreshSession(tokenInstance);

    res.send({ data: userWithTokens });
  } catch (error) {
    next(error);
  }
};
