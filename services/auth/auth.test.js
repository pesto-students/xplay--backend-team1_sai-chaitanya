const { MongoClient } = require('mongodb');

const { CONFIG } = require('../../config');
const { COLLECTIONS } = require('../constants');

describe('Auth APIs', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(CONFIG.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(CONFIG.DB_NAME);
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should fetch users from collection', async () => {
        const usersCollection = db.collection(COLLECTIONS.USERS);
        const users = await usersCollection.find().toArray();
        expect(users).toEqual(expect.anything());
    });
});
