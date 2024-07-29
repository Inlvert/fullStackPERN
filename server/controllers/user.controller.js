const e = require("express");
const { User } = require("../models");

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
