const {
	_getMoviesByType,
	_getMoviesByGenre,
	_getPromotedMovie,
	_getMovieDetailsById,
	_searchMoviesByTitle,
} = require('../services');

const getMovieById = async (req, res) => {
	try {
		const data = await _getMovieDetailsById(req.params.id);
		res.send(data);
	} catch (error) {
		res.send(error);
	}
};

const getMoviesByType = async (req, res) => {
	try {
		const data = await _getMoviesByType({
			type: req.params.type,
			query: req.query
		});
		res.send(data);
	} catch (error) {
		res.send(error);
	}
};

const getMoviesByGenre = async (req, res) => {
	try {
		const data = await _getMoviesByGenre({
			genre: req.params.genre,
			id: req.params?.id || '',
			query: req.query
		});
		res.send(data);
	} catch (error) {
		res.send(error);
	}
};

const getPromotedMovie = async (req, res) => {
	try {
		const data = await _getPromotedMovie();
		res.send(data);
	} catch (error) {
		res.send(error);
	}
};

const searchMoviesByTitle = async (req, res) => {
	try {
		const data = await _searchMoviesByTitle({
			title: req.params.title,
			query: req.query
		});
		res.send(data);
	} catch (error) {
		res.send(error);
	}
};

module.exports = {
	getMovieById,
	getMoviesByType,
	getMoviesByGenre,
	getPromotedMovie,
	searchMoviesByTitle,
};
