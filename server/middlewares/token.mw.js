const createHttpError = require("http-errors");
const JwtService = require('../services/jwt.service');
const { RefreshToken } = require("../models");


module.exports.cheackAccessToken = async (req, res, next) => {
  try {
    const {headers: {athorization}} = req;

    if(!athorization) {
      return next(createHttpError(401, 'Access token required'))
    }

    const [type, token] = athorization.split(' ');

    const tokenPayload = await JwtService.verifyAccessToken(token)

    req.tokenData = tokenPayload;

  } catch (error) {
    next(error)
  }
}

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const {body: {refreshToken}} = req;

    if(!refreshToken) {
      return next(createHttpError(400, 'Refresh token required'))
    }

    const tokenPayload = await JwtService.verifyRefreshToken(refreshToken);

    const tokenInstance = await RefreshToken.findOne({ where: { token: refreshToken, userId: tokenPayload.id } })

    if(! tokenInstance) {
      return next(createHttpError(404, 'Refresh token not found'))
    }

    req.tokenInstance = tokenInstance;

    next();

  } catch (error) {
    next(error)
  }
}