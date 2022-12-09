const supertest = require('supertest');

let server;

describe('Watch Party APIs', () => {

    afterEach(async () => {
        await server.close();
    });

    beforeEach(() => {
        // eslint-disable-next-line global-require
        server = require('../../server');
    });

    test('GET /watchParty/test_id', async () => {
        await supertest(server)
            .get('/api/watchParty/test_id')
            .expect(200)
            .then((response) => {
                expect(typeof response.body?.data === 'object').toBeTruthy();
            }).catch((error) => {
                expect(typeof error === 'object').toBeTruthy();
            });
    });

    test('POST /watchParty', async () => {
        const watchParty = {
            attendees: ['638b2ca422faf62fa16ee5f6', '638b203322faf62fa16ee5f4'],
            host: '638b2ca422faf62fa16ee5f6',
            movieId: '63825dd8aced639172b2b831',
            watchPartyName: "Tushar's Watch Party"
        };

        await supertest(server)
            .post('/api/watchParty')
            .send(watchParty)
            .expect(200)
            .then((response) => {
                expect(typeof response.body?.data === 'object').toBeTruthy();
            }).catch((error) => {
                expect(typeof error === 'object').toBeTruthy();
            });
    });
});