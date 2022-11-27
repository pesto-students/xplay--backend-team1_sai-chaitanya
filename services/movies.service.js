const Sentry = require('@sentry/node');

const { getCollection } = require('../db');
const { getFilterByType } = require('./helpers');
const { sendError, sendSuccess } = require('../utils');

/**
 * @function _getMovieListByType a method to get list of movies for the given type
 * @param {String} type featured, latest, watchlist
 * @param {Object} query - search query params (limit, offset)
 * @example http://localhost:8080/api/movieList/featured
 * @returns data on success, error on failure
 */
const _getMovieListByType = async ({ type, query }) => {
	try {
		// TODO: pagination support
		// const { limit = 10, offset = 0 } = query;
		const movieCollection = await getCollection('movies');
		const movieListByType = await movieCollection.find(
			getFilterByType(type)
		).toArray();
		return sendSuccess(movieListByType);
	} catch (error) {
		Sentry.captureException(error);
		return sendError(error);
	}
};

/**
 * @function _getPromotedMovie a method to get a promoted movie
 * @example http://localhost:8080/api/promotedMovie
 * @returns data on success, error on failure
 */
const _getPromotedMovie = async () => {
	try {
		const movieCollection = await getCollection('movies');
		const promotedMovie = await movieCollection.findOne({ isPromoted: true });
		return sendSuccess(promotedMovie);
	} catch (error) {
		Sentry.captureException(error);
		return sendError(error);
	}
};

module.exports = {
	_getPromotedMovie,
	_getMovieListByType
};
