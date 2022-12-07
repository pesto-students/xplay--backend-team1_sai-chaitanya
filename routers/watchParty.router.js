const watchPartyRouter = require('express').Router();

const { logger } = require('../middlewares');
const { createWatchParty } = require('../controllers');

watchPartyRouter.use(logger);

watchPartyRouter.post('/', createWatchParty);

module.exports = { watchPartyRouter };
