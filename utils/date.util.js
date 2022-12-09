const validateNumberOfDays = (noOfDays) => {
	return typeof noOfDays === 'number'
		&& noOfDays > 0
		&& !isNaN(noOfDays)
		&& Number.isFinite(noOfDays);
};

const getPastDateByDays = (noOfDays) => {
	if (!validateNumberOfDays(noOfDays)) throw new Error('Please provide noOfDays');

	return new Date(
		(new Date().getTime() - (noOfDays * 24 * 60 * 60 * 1000))
	).getTime();
};

module.exports = {
	getPastDateByDays
};
