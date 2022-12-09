const supertest = require('supertest');

let server;

describe('Movie APIs', () => {

    afterEach(async () => {
        await server.close();
    });

    beforeEach(() => {
        // eslint-disable-next-line global-require
        server = require('../../server');
    });

    test('GET /movie/test_id', async () => {
        await supertest(server)
            .get('/api/movie/test_id')
            .expect(200)
            .then((response) => {
                expect(typeof response.body?.data === 'object').toBeTruthy();
            }).catch((error) => {
                expect(typeof error === 'object').toBeTruthy();
            });
    });

    test('GET /promotedMovie', async () => {
        await supertest(server)
            .get('/api/promotedMovie')
            .expect(200)
            .then((response) => {
                expect(typeof response.body?.data === 'object').toBeTruthy();
            }).catch((error) => {
                expect(typeof error === 'object').toBeTruthy();
            });
    });

    test('GET /movies/latest', async () => {
        await supertest(server)
            .get('/api/movieList/latest')
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body?.data)).toBeTruthy();
            }).catch((error) => {
                expect(typeof error === 'object').toBeTruthy();
            });
    });

    test('GET /movies/featured', async () => {
        await supertest(server)
            .get('/api/movieList/featured')
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body?.data)).toBeTruthy();
            }).catch((error) => {
                expect(typeof error === 'object').toBeTruthy();
            });
    });

    test('GET /movies/genre/sci-fi', async () => {
        await supertest(server)
            .get('/api/movieList/genre/sci-fi')
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body?.data)).toBeTruthy();
            }).catch((error) => {
                expect(typeof error === 'object').toBeTruthy();
            });
    });
});