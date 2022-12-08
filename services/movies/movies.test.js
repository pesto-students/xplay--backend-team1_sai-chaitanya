const { MongoClient, ObjectId } = require('mongodb');

const { CONFIG } = require('../../config');
const { COLLECTIONS } = require('../constants');

describe('Movie Services', () => {
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

    it('should fetch promoted movie from collection', async () => {
        const moviesCollection = db.collection(COLLECTIONS.MOVIES);
        const movie = await moviesCollection.findOne({ isPromoted: true });
        expect(typeof movie === 'object').toBeTruthy();
    });

    it('should fetch movie by id from collection', async () => {
        const moviesCollection = db.collection(COLLECTIONS.MOVIES);
        const movie = await moviesCollection.findOne(ObjectId("63825dd8aced639172b2b831"));
        expect(typeof movie === 'object').toBeTruthy();
    });

    it('should fetch featured movies from collection', async () => {
        const moviesCollection = db.collection(COLLECTIONS.MOVIES);
        const movies = await moviesCollection.find({ "isFeatured": true }).toArray();
        expect(Array.isArray(movies)).toBeTruthy();
    });
});
