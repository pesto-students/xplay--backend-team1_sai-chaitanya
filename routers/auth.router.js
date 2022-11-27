const authRouter = require('express').Router();

const { logger } = require('../middlewares');
const { signUp } = require('../controllers');

authRouter.use(logger);

authRouter.post('/signup', signUp);

module.exports = { authRouter };
