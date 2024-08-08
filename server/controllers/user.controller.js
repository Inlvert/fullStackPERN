const e = require("express");
const { User } = require("../models");
const createHttpError = require("http-errors");
const { where } = require("sequelize");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.findUserByEmail = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(createHttpError(404, "invalid email"));
    }

    if (user.password !== password) {
      return next(createHttpError(404, "invalid password"));
    }

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};
