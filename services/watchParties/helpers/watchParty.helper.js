const { getOtp } = require('../watchParties.utils');

const getQueryByStatus = (status) => {
    if (status === 'started') {
        return { status: 'started' };
    } else if (status === 'ended') {
        return { endedAt: Date.now(), status: 'ended' };
    }
    return {};
};

const getWatchPartyObject = (body) => ({
    "endedAt": null,
    "movieId": body?.movieId,
    "name": body?.watchPartyName,
    "otp": getOtp(),
    "startedAt": Date.now(),
    "status": "ready"
});

const getWatchPartyUsersArray = (body, watchPartyId) => {
    const watchPartyUsers = [];

    body?.attendees?.forEach((attendee) => {
        watchPartyUsers.push({
            "isHost": attendee === body?.host,
            "isJoined": false,
            "watchPartyId": watchPartyId,
            "userId": attendee
        });
    });

    return watchPartyUsers;
};

module.exports = {
    getQueryByStatus,
    getWatchPartyObject,
    getWatchPartyUsersArray
};
