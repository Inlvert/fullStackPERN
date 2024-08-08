const createHttpError = require("http-errors");
const { RefreshToken, User } = require("../models");
const JwtService = require("./jwt.service");

module.exports.createSession = async (user) => {
  const tokenPayload = {
    id: user.id,
    name: user.name,
  };

  const tokenPair = await JwtService.createTokenPair(tokenPayload);

  await RefreshToken.create({ token: tokenPair.refreshToken, userId: user.id });

  return {
    user,
    tokenPair,
  };
};

module.exports.refreshSession = async (refreshTokenInstance) => {
  // Перевірка, чи присутній refreshTokenInstance і його атрибути
  if (!refreshTokenInstance || !refreshTokenInstance.userId || !refreshTokenInstance.token) {
    throw createHttpError(400, 'Invalid refresh token instance');
  }

  // Верифікація refresh токену
  try {
    await JwtService.verifyRefreshToken(refreshTokenInstance.token);
  } catch (err) {
    throw createHttpError(401, 'Invalid refresh token');
  }

  // Знаходження користувача за ID
  const user = await User.findByPk(refreshTokenInstance.userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  // Створення нового токену
  const tokenPayload = {
    id: user.id,
    name: user.name,
  };

  const tokenPair = await JwtService.createTokenPair(tokenPayload);

  // Оновлення refresh токену в базі даних
  const updated = await RefreshToken.update(
    { token: tokenPair.refreshToken },
    { where: { token: refreshTokenInstance.token } }
  );

  if (updated[0] === 0) {
    throw createHttpError(404, 'Refresh token not found or not updated');
  }

  return {
    user,
    tokenPair
  };
};