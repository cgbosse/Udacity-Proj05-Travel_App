 // Import the js file to test
 import { serverApiResults } from "../src/client/js/results"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing that the response contains the different properties required for generating the Results contents.", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the serverApiResults() function", () => {
            // Define the input for the function, if any, in the form of variables/array
            const testResponseJson = {
                agreement: "Agreement",
                subjectivity: "Subjectivity",
                confidence: "100",
                irony: "Irony"  
            } 
         // Set up our document body
            document.body.innerHTML = `
                <section class="results">
                <h2>Form Results</h2>
                <div class="resultsbox">
                    <div class="resultsboxitem">
                    Agreement:
                    </div>
                    <div id="agreement" class="resultsboxitemapi">
                        --------------
                    </div>
                </div>
                <div class="resultsbox">
                    <div class="resultsboxitem">
                    Subjectivity:
                    </div>
                    <div id="subjectivity" class="resultsboxitemapi">
                        --------------
                    </div>
                </div>
                <div class="resultsbox">
                    <div class="resultsboxitem">
                    Confidence:
                    </div>
                    <div id="confidence" class="resultsboxitemapi">
                        --------------
                    </div>
                </div>
                <div class="resultsbox">
                    <div class="resultsboxitem">
                    Irony:
                    </div>
                    <div id="irony" class="resultsboxitemapi">
                        --------------
                    </div>
                </div>
                </section>
            `;
           
            const agreement = document.getElementById('agreement');
            const subjectivity = document.getElementById('subjectivity');
            const confidence = document.getElementById('confidence');
            const irony = document.getElementById('irony');

            // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
            // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
            expect(serverApiResults(testResponseJson));
            expect(agreement.innerHTML).toBe("Agreement");
            expect(subjectivity.innerHTML).toBe("Subjectivity");
            expect(confidence.innerHTML).toBe("100");
            expect(irony.innerHTML).toBe("Irony");         
            //expect(serverApiResults(testResponseJson)).resolves.toMatchObject(testResponseJsonContent);
})});