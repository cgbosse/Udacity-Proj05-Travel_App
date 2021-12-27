 // Import the js file to test
 import { daysTillTrip } from "../src/client/js/daysTillTrip"

describe("Testing the generation of days indication", () => {
    test("Testing the formCheck() function with an empty object response", () => {
            // Define the input for the function, if any, in the form of variables/array
            const input = "None Selected";
            // Define the expected output, if any, in the form of variables/array
            // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
            // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
            expect(daysTillTrip(input)).toBe(0);
            }
        );
        test("Testing the formCheck() function with the date 2029/12/31", () => {
            // Define the input for the function, if any, in the form of variables/array
            const input = "2029/12/31";
            // Define the expected output, if any, in the form of variables/array
            // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
            // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
            expect(daysTillTrip(input)).toBeGreaterThan(0);
            }
        );
    }
);