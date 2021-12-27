import regeneratorRuntime from "regenerator-runtime/runtime";
let geonameAPI = require ("../src/server/geonameAPI.js");

const mockResponse = {
            "longitude":"13.41053",
            "latitude":"52.52437"
        };

const city = "Berlin";


//Setup adapted from https://medium.com/fernandodof/how-to-mock-fetch-calls-with-jest-a666ae1e7752

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockResponse)
}));

describe('Mock geonameAPI', () => {
    let testgeonameApi;
    
    describe('When the city is posted to the geoname server for the api call', () => {
        beforeEach(async () => {
            testgeonameApi = await geonameAPI(city);
        });

        it('Then the mockResponse JSON object should be returned', () => {
            expect(testgeonameApi).toMatchObject(mockResponse);
        });
    });
});
