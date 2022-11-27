require('dotenv').config();

const axios = require('axios');
const authRouter = require('express').Router();

const { logger } = require('../middlewares');

const TOKEN = process.env.OKTA_API_TOKEN;
const API_URL = `${process.env.OKTA_ORG_URL}/api/v1/users?activate=true`;

authRouter.use(logger);

authRouter.post('/signup', async (req, res) => {
	const data = {
		profile: {
			firstName: req.body?.firstName,
			lastName: req.body?.lastName,
			email: req.body?.email,
			login: req.body?.email,
		},
		credentials: {
			password: { value: req.body?.password }
		}
	}
	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `SSWS ${TOKEN}`
	}
	try {
		let response = await axios.post(API_URL, data, { headers: headers });
		response = response?.data;
		if (response?.errorCode) {
			res.status(400).send(JSON.stringify({ error: true, message: response?.errorCauses }));
		} else {
			console.log({
				created: response?.created,
				id: response?.id,
				profile: response?.profile,
				status: response?.status,
			});
			res.status(200).send(JSON.stringify({ error: false, message: 'user created successfully' }));
		}
	} catch (err) {
		res.status(err?.response?.status || 400).send(JSON.stringify({
			errorCode: err?.response?.data?.errorCode,
			errorSummary: err?.response?.data?.errorCauses?.[0]?.errorSummary
		}));
	}
});

module.exports = { authRouter };
