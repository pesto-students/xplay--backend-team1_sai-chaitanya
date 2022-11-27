const { _getMovieListByType, _getPromotedMovie, _getMovieById } = require("../services");

const getMovieById = async (req, res) => {
	try {
		const data = await _getMovieById(req.params.id);
		res.send(data);
	} catch (error) {
		res.send(error);
	}
};

const getMovieListByType = async (req, res) => {
	try {
		const data = await _getMovieListByType({
			type: req.params.type,
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

module.exports = {
	getMovieById,
	getPromotedMovie,
	getMovieListByType
};
