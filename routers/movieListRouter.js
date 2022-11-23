require('dotenv').config();

const movieListRouter = require('express').Router();

const { logger } = require('../middlewares');
let mockMovieList = require('../mockData/movieList.json');

movieListRouter.use(logger);

movieListRouter.get('/movieList', async (req, res) => {
    res.status(200).send(JSON.stringify({ error: false, data: mockMovieList }));
});

movieListRouter.get('/movieList/:type', async (req, res) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const movieListByType = mockMovieList?.filter(movie => movie?.type === req?.params?.type)?.slice(offset, limit);
    res.status(200).send(JSON.stringify({ error: false, data: movieListByType }));
});

module.exports = { movieListRouter };
