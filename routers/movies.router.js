const moviesRouter = require('express').Router();

const { logger } = require('../middlewares');
const {
    getMovieById,
    getMoviesByType,
    getMoviesByGenre,
    getPromotedMovie,
    searchMoviesByTitle,
} = require('../controllers');

moviesRouter.use(logger);

moviesRouter.get('/movie/:id', getMovieById);

moviesRouter.get('/promotedMovie', getPromotedMovie);

moviesRouter.get('/movieList/:type', getMoviesByType);

moviesRouter.get('/movieList/genre/:genre/:id?', getMoviesByGenre);

moviesRouter.get('/movieList/search/:title', searchMoviesByTitle);

module.exports = { moviesRouter };
