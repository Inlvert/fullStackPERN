const authRouter = require('express').Router();
const authControllre = require('../controllers/authController');
const { cheackRefreshToken } = require('../middlewares/token.mw');


authRouter.post('/registartion', authControllre.registration)
authRouter.post('/login', authControllre.login)
authRouter.post('/refresh', cheackRefreshToken, authControllre.refresh)


module.exports = authRouter;