require('dotenv').config();

const moviesRouter = require('express').Router();

const { logger } = require('../middlewares');
const { getMovieListByType, getPromotedMovie, getMovieById } = require('../controllers');

moviesRouter.use(logger);

moviesRouter.get('/movie/:id', getMovieById);

moviesRouter.get('/promotedMovie', getPromotedMovie);

moviesRouter.get('/movieList/:type', getMovieListByType);

module.exports = { moviesRouter };
