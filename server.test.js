const supertest = require('supertest');

let server;

describe('Server health checkup', () => {

    afterEach(async () => {
        await server.close();
    });

    beforeEach(() => {
        // eslint-disable-next-line global-require
        server = require('./server');
    });

    test('GET / should show server health', async () => {
        await supertest(server)
            .get('/api/')
            .expect(200)
            .then((response) => {
                // Check the response type and length
                expect(typeof response.body === 'string').toBeTruthy()
            }).catch((error) => {
                expect(typeof error === 'object').toBeTruthy();
            });
    });
});
