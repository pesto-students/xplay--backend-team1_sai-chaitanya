function sendError(body) {
	return { error: true, ...body };
}

function sendSuccess(body) {
	return { error: false, ...body };
}

module.exports = { sendError, sendSuccess };
