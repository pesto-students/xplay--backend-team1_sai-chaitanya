const Sentry = require('@sentry/node');
const { _updateWatchParty, _getWatchPartyById } = require('../services');

const initSocket = (server) => {
    const io = require('socket.io')(server, { cors: { origin: '*' } });
    const connections = new Set();

    io.on('connection', (socket) => {
        connections.add(socket);

        socket.on('resumeWatchParty', async (partyId) => {
            socket.join(partyId);
            socket.to(partyId).emit('watchPartyResumed');
        });

        socket.on('startWatchParty', async (partyId) => {
            socket.join(partyId);
            try {
                // checking if the watch party is ready to start
                const { data: watchParty } = await _getWatchPartyById(partyId);
                if (watchParty?.status !== 'ready') {
                    socket.to(partyId).emit('watchPartyInvalid');
                } else {
                    const {
                        data: updateWatchPartyResponse
                    } = await _updateWatchParty(
                        partyId, 'started'
                    );
                    if (updateWatchPartyResponse?.updated) {
                        // joining to a room, using the id same as watch party
                        socket.join(partyId);
                        socket.to(partyId).emit('watchPartyStarted');
                    }
                }
            } catch (error) {
                Sentry.captureException(error);
                console.error(error);
                socket.emit('error', error)
            }
        });

        socket.on('endWatchParty', async (partyId) => {
            const { data } = await _updateWatchParty(partyId, 'ended');
            if (data?.updated) {
                // leaving the room created for the watch party
                socket.leave(partyId);
                socket.to(partyId).emit('watchPartyEnded');
            }
        });

        socket.on('disconnect', () => {
            connections.delete(socket);
        });
    });

    io.on('error', (...args) => {
        Sentry.captureException({ socketError: args });
    });
}

module.exports = {
    initSocket
};
