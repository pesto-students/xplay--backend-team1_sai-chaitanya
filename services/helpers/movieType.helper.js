const { PAST_INTERVAL_IN_DAYS } = require('./constants');

const { getPastDateByDays } = require("../../utils");

const getFilterByType = (type) => {
	if (type === 'featured') {
		return { "isFeatured": true };
	} else if (type === 'latest') {
		return {
			"publishedAt": {
				$gte: getPastDateByDays(PAST_INTERVAL_IN_DAYS)
			}
		};
	}
	return {};
};

module.exports = {
	getFilterByType
};
