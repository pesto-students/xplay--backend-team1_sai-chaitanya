const { STATIC_VALUES } = require('../constants');

const { getPastDateByDays } = require("../../utils");

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

module.exports = {
	getFilterByType
};
