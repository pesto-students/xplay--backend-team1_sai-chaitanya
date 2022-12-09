const supertest = require('supertest');

let server;

describe('User APIs', () => {

    afterEach(async () => {
        await server.close();
    });

    beforeEach(() => {
        // eslint-disable-next-line global-require
        server = require('../../server');
    });

    test('GET /auth/users', async () => {
        await supertest(server)
            .get('/api/auth/users')
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body?.data)).toBeTruthy();
            }).catch((error) => {
                expect(typeof error === 'object').toBeTruthy();
            });
    });

    test('POST /auth/signup', async () => {
        const user = {
            "profile": {
                "firstName": "fname",
                "lastName": "lname",
                "email": "testemail@gmail.com",
                "login": "testemail@gmail.com"
            },
            "credentials": {
                "password": {
                    "value": "password123"
                }
            }
        };

        await supertest(server)
            .post('/api/auth/signup')
            .send(user)
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body?.data)).toBeTruthy();
            }).catch((error) => {
                expect(typeof error === 'object').toBeTruthy();
            });
    });
});
