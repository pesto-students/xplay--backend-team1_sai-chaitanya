const {
    sendError,
    sendSuccess,
    getPastDateByDays
} = {
    ...require('./date.util'),
    ...require('./response.util')
};

test('getPastDateByDays(30) should return a 30 days old date', () => {
    const oldDate = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
    expect(getPastDateByDays(30)).toBeGreaterThanOrEqual(oldDate);
});

test('getPastDateByDays with no or invalid input should throw an error', () => {
    expect(() => getPastDateByDays()).toThrow(Error);
    expect(() => getPastDateByDays(0)).toThrow(Error);
    expect(() => getPastDateByDays('')).toThrow(Error);
    expect(() => getPastDateByDays(-1)).toThrow(Error);
    expect(() => getPastDateByDays(null)).toThrow(Error);
    expect(() => getPastDateByDays(Infinity)).toThrow(Error);
    expect(() => getPastDateByDays(undefined)).toThrow(Error);
});

test('sendError should return error response', () => {
    const data = { "testProp": "testVal" };
    const sampleResponse = { error: true, data: data };
    expect(() => sendError(data).toBe(sampleResponse));
});

test('sendSuccess should return success response', () => {
    const data = { "testProp": "testVal" };
    const sampleResponse = { error: false, data: data };
    expect(() => sendSuccess(data).toBe(sampleResponse));
});
