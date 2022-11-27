const { _getMovieListByType, _getPromotedMovie } = require("../services");

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
	getPromotedMovie,
	getMovieListByType
};
