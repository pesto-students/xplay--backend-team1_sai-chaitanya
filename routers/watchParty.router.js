const watchPartyRouter = require('express').Router();

const { logger } = require('../middlewares');
const { createWatchParty, getWatchPartyByOtp } = require('../controllers');

watchPartyRouter.use(logger);

watchPartyRouter.post('/', createWatchParty);

watchPartyRouter.get('/otp/:otp', getWatchPartyByOtp);

module.exports = { watchPartyRouter };
