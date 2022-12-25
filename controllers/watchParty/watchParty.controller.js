const { _createWatchParty, _getWatchPartyByOtp } = require('../../services');

const createWatchParty = async (req, res) => {
    try {
        const data = await _createWatchParty(req.body);
        res.send(data);
    } catch (error) {
        res.send(error);
    }
};

const getWatchPartyByOtp = async (req, res) => {
    try {
		const data = await _getWatchPartyByOtp(req.params.otp);
		res.send(data);
	} catch (error) {
		res.send(error);
	}
};

module.exports = {
    createWatchParty,
    getWatchPartyByOtp
};
