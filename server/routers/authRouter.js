const authRouter = require('express').Router();
const authController = require('../controllers/authController');
const { checkRefreshToken } = require('../middlewares/token.mw');
const cartRouter = require('./cartRouter');


authRouter.post('/registration', authController.registration)
authRouter.post('/login', authController.login)
authRouter.post('/refresh', checkRefreshToken, authController.refresh)



module.exports = authRouter;