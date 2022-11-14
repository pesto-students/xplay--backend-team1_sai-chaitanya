const Sentry = require('@sentry/node');
const router = require('express').Router();

const { logger } = require('../middlewares');

router.use(logger);

router.get("/debug-sentry", function mainHandler(req, res) {
    Sentry.captureException(new Error("My second Sentry error!"))
    throw new Error("My second Sentry error!");
});

module.exports = { router };
