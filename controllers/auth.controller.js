const { _signUp } = require("../services");

const signUp = async (req, res) => {
    try {
        const data = await _signUp(req.body);
        res.status(data?.data?.statusCode || 200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    signUp
};
