const router = require('express').Router();

const { logger } = require('../middlewares');

router.use(logger);

router.get('/', (req, res) => {
    res.status(200).send('token valid');
    // res.status(200).send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = { router };
