 // Import the js file to test
 //import { consultTrip } from "../src/server/consultTrip"

// --------------------------------consultTrip-------------------------------------
// Import function from another js file in the same folder
let consultTrip = require('./src/server/consultTrip.js');


describe("Testing the consultTrip request sent from the client side to the server", () => {
    test("Testing the consultTrip() function with a prepared object request", () => {
            // Define the input for the function, if any, in the form of variables/array
            const input = {
                "tripId":"1"
            };
            
            // Variables referred to during the test
            const savedTrips = {
                "1": {
                    "test": "object"
                }
            };

            // Define the expected output, if any, in the form of variables/array
            const output = {
                "1": {
                    "test": "object"
                }
            };
            
            // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
            // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
            expect(consultTrip(input)).toMatchObject(output);
            }
        );
    }
);