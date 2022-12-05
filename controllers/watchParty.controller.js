const { _createWatchParty } = require('../services');

const createWatchParty = async (req, res) => {
    try {
        const data = await _createWatchParty(req.body);
        res.send(data);
    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    createWatchParty
};
