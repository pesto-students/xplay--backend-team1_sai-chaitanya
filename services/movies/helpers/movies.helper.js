const { ObjectId } = require('mongodb');

const { STATIC_VALUES } = require('../../constants');
const { getPastDateByDays } = require('../../../utils');

const getFilterByType = (type) => {
	if (type === 'featured') {
		return { "isFeatured": true };
	} else if (type === 'latest') {
		return {
			"publishedAt": {
				$gte: getPastDateByDays(STATIC_VALUES.PAST_INTERVAL_IN_DAYS)
			}
		};
	}
	return {};
};

const getGenreFilter = (genre, id) => {
	if (id) {
		return { "genre": genre, '_id': { $ne: ObjectId(id) } };
	} else {
		return { "genre": genre };
	}
};

module.exports = {
	getGenreFilter,
	getFilterByType
};
