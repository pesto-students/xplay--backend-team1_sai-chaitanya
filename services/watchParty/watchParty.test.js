const { MongoClient } = require('mongodb');

const { CONFIG } = require('../../config');
const { COLLECTIONS } = require('../constants');

describe('Watch Party APIs', () => {
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

    it('should fetch watch parties from collection', async () => {
        const partiesCollection = db.collection(COLLECTIONS.WATCH_PARTIES);
        const parties = await partiesCollection.find().toArray();
        expect(parties).toEqual(expect.anything());
    });
});
