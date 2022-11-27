function sendError(body) {
	return { error: true, error: body };
}

function sendSuccess(body) {
	return { error: false, data: body };
}

module.exports = { sendError, sendSuccess };
