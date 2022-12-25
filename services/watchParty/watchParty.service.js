const Sentry = require('@sentry/node');
const { ObjectId } = require('mongodb');

const {
    getQueryByStatus,
    getWatchPartyObject,
    getWatchPartyUsersArray
} = require('./helpers');
const { getCollection } = require('../../db');
const { COLLECTIONS } = require('../constants');
const { sendError, sendSuccess } = require('../../utils');

/**
 * @function _createWatchParty a method to get a movie by its ObjetID
 * @param {Object} body an input Object of a watch party
 * @example http://localhost:8080/api/watchParty
 * @body {
 * 		attendees: ['638b2ca422faf62fa16ee5f6', '638b203322faf62fa16ee5f4'],
 * 		host: '638b2ca422faf62fa16ee5f6',
 * 		movieId: "63825dd8aced639172b2b831",
 * 		watchPartyName: "Tushar's Watch Party"
 * }
 * @returns data (otp, partyId) on success, error on failure
 */
const _createWatchParty = async (body) => {
    try {
        /* 1. insert an entry into watch party collection */
        const watchPartyObject = getWatchPartyObject(body);
        const watchPartyCollection = await getCollection(COLLECTIONS.WATCH_PARTIES);
        const insertWatchParty = await watchPartyCollection.insertOne(watchPartyObject);
        /* 2. insert an entry into watchPartyUsers collection */
        const watchPartyUser = getWatchPartyUsersArray(body, insertWatchParty?.insertedId);
        const watchPartiesUsersCollection = await getCollection(COLLECTIONS.WATCH_PARTIES_USERS);
        const insertWatchPartyUser = await watchPartiesUsersCollection.insertMany(watchPartyUser);
        const resType = insertWatchPartyUser?.acknowledged ? sendSuccess : sendError;
        return resType({
            otp: watchPartyObject.otp,
            partyId: insertWatchParty?.insertedId
        });
    } catch (error) {
        Sentry.captureException(error);
        return sendError(error);
    }
};

/**
 * @function _getWatchPartyById a method to get the specific watch party by ID
 * @param {String} id an ObjectID of a watchParty
 * @method GET
 * @example http://localhost:8080/api/watchParty/63825dd8aced639172b2b831
 * @returns data on success, error on failure
 */
const _getWatchPartyById = async (id) => {
    try {
        const watchPartyCollection = await getCollection(COLLECTIONS.WATCH_PARTIES);
        const watchParty = await watchPartyCollection.findOne(ObjectId(id));
        return sendSuccess(watchParty);
    } catch (error) {
        Sentry.captureException(error);
        return sendError(error);
    }
};

/**
 * @function _getWatchPartyByOtp a method to get the specific watch party by OTP
 * @param {String} otp an otp generated for a watchParty
 * @method GET
 * @example http://localhost:8080/api/watchParty/otp/123456
 * @returns data on success, error on failure
 */
const _getWatchPartyByOtp = async (otp) => {
    try {
        // get watch party by otp
        const watchPartyCollection = await getCollection(COLLECTIONS.WATCH_PARTIES);
        const watchParty = await watchPartyCollection.findOne({ otp: otp });
        if (!watchParty?._id) {
            return sendError({
                errorSummary: 'Watch party not found!',
            });
        }
        // get host user
        const watchPartiesUsersCollection = await getCollection(COLLECTIONS.WATCH_PARTIES_USERS);
        const watchPartyHost = await watchPartiesUsersCollection.findOne({
            isHost: true, watchPartyId: watchParty._id
        });
        const usersCollection = await getCollection(COLLECTIONS.USERS);
        const hostUser = await usersCollection.findOne(ObjectId(watchPartyHost?.userId));

        // get movie by id
        const movieCollection = await getCollection(COLLECTIONS.MOVIES);
        const movieData = await movieCollection.findOne(ObjectId(watchParty?.movieId));

        return sendSuccess({
            host: hostUser?.email,
            movieDetails: movieData
        });
    } catch (error) {
        Sentry.captureException(error);
        return sendError(error);
    }
};

/**
 * @function _updateWatchParty a method to get a movie by its ObjetID
 * @param {String} partyId an ObjectID of a watchParty
 * @param {String} status to update watch party with: (started, ended)
 * @method PUT
 * @example http://localhost:8080/api/watchParty/63825dd8aced639172b2b831
 * @returns data on success, error on failure
 */
const _updateWatchParty = async (partyId, status) => {
    try {
        const watchPartyCollection = await getCollection(COLLECTIONS.WATCH_PARTIES);
        const updateWatchParty = await watchPartyCollection.updateOne({
            _id: ObjectId(partyId)
        }, {
            $set: getQueryByStatus(status)
        });
        const resType = updateWatchParty?.acknowledged ? sendSuccess : sendError;
        return resType({
            partyId,
            updated: updateWatchParty?.acknowledged
        });
    } catch (error) {
        Sentry.captureException(error);
        return sendError(error);
    }
};

module.exports = {
    _createWatchParty,
    _updateWatchParty,
    _getWatchPartyById,
    _getWatchPartyByOtp
};
