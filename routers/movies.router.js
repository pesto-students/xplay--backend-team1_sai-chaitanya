require('dotenv').config();

const moviesRouter = require('express').Router();

const { logger } = require('../middlewares');
const { getMovieListByType, getPromotedMovie } = require('../controllers');

moviesRouter.use(logger);

moviesRouter.get('/promotedMovie', getPromotedMovie);

moviesRouter.get('/movieList/:type', getMovieListByType);

module.exports = { moviesRouter };
