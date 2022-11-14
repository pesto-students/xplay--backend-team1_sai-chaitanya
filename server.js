const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const { authRouter, router } = require('./routers');
const { errorHandler, rateLimiter, tokenVerifier } = require('./middlewares');
const { CONFIG, corsOptions } = require('./config');

const app = express();
const port = CONFIG.PORT;

app.use(cors());

app.use(rateLimiter);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api/auth', authRouter);

// checking for the valid headers
app.use(tokenVerifier);

app.use('*', router);

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}..`));
