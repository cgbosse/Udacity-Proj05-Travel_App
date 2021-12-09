 // Import the js file to test
 import { contentCheck } from "../src/client/js/contentChecker"

describe("Testing whether the submitted text from the form is not empty", () => {
    test("Testing the contentCheck() function", () => {
            // Define the input for the function, if any, in the form of variables/array
            const input = "";
            // Define the expected output, if any, in the form of variables/array
            // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
            // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
            expect(contentCheck(input)).toBeTruthy();
})});
