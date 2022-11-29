const Sentry = require('@sentry/node');
const { ObjectId } = require('mongodb');

const { getCollection } = require('../db');
const { COLLECTIONS } = require('./constants');
const { getFilterByType } = require('./helpers');
const { sendError, sendSuccess } = require('../utils');

/**
 * @function _getMovieDetailsById a method to get a movie by its ObjetID
 * @param {String} id an ObjectID of a movie
 * @example http://localhost:8080/api/movie/63825dd8aced639172b2b831
 * @returns data on success, error on failure
 */
const _getMovieDetailsById = async (id) => {
	try {
		const movieCollection = await getCollection(COLLECTIONS.MOVIES);
		const movieData = await movieCollection.findOne(ObjectId(id));
		return sendSuccess(movieData);
	} catch (error) {
		Sentry.captureException(error);
		return sendError(error);
	}
};

/**
 * @function _getMoviesByType a method to get list of movies for the given type
 * @param {String} type featured, latest, watchlist
 * @param {Object} query - search query params (limit, offset)
 * @example http://localhost:8080/api/movieList/featured
 * @returns data on success, error on failure
 */
const _getMoviesByType = async ({ type, query }) => {
	try {
		// TODO: pagination support
		// const { limit = 10, offset = 0 } = query;
		const movieCollection = await getCollection(COLLECTIONS.MOVIES);
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
 * @function _getMoviesByGenre a method to get list of movies for the given genre
 * @param {String} genre comedy, sci-fi etc
 * @param {Object} query - search query params (limit, offset)
 * @example http://localhost:8080/api/movieList/genre/sci-fi
 * @returns data on success, error on failure
 */
const _getMoviesByGenre = async ({ genre, query }) => {
	try {
		// TODO: pagination support
		// const { limit = 10, offset = 0 } = query;
		const movieCollection = await getCollection(COLLECTIONS.MOVIES);
		const movieListByType = await movieCollection.find({
			'genre': genre
		}).toArray();
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
		const movieCollection = await getCollection(COLLECTIONS.MOVIES);
		const promotedMovie = await movieCollection.findOne({ isPromoted: true });
		return sendSuccess(promotedMovie);
	} catch (error) {
		Sentry.captureException(error);
		return sendError(error);
	}
};

/**
 * @function _searchMoviesByTitle a method to get list of movies for the given title
 * @param {String} title featured, latest, watchlist
 * @param {Object} query - search query params (limit, offset)
 * @example http://localhost:8080/api/movieList/search/spider
 * @returns data on success, error on failure
 */
const _searchMoviesByTitle = async ({ title, query }) => {
	try {
		// TODO: pagination support
		// const { limit = 10, offset = 0 } = query;
		const movieCollection = await getCollection(COLLECTIONS.MOVIES);
		const movieListByType = await movieCollection.find({
			'title': { $regex: `.*${title}.*`, $options: 'i' }
		}).toArray();
		return sendSuccess(movieListByType);
	} catch (error) {
		Sentry.captureException(error);
		return sendError(error);
	}
};

module.exports = {
	_getMoviesByType,
	_getMoviesByGenre,
	_getPromotedMovie,
	_getMovieDetailsById,
	_searchMoviesByTitle,
};
