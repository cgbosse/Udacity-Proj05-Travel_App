# Stage 4 - Unit Testing using Jest Framework

You must have read the rubric item for "Testing" criteria, that says:

    Check that the project has Jest installed, that there is an npm script to run Jest, and that the tests all pass. Every src/client/js file should have at least one test.

[Jest](https://jestjs.io/en/) is a framework for testing JavaScript projects. We are interested in the unit-testing of our project. The Jest framework provides us the ability to create, and run unit tests. In general, unit testing means to test the functionality of each unit/component of a project. But, in our case, we will write tests for desired functions defined in the src/client/js directory. The tests will check if the functions are behaving expectedly when provided an input. Let's learn to add Jest to your project to handle unit-testing.

**How does it work?**

1. Install Jest by using npm install --save-dev jest

2. Write the custom JS in your src/client/js directory, responsible for the server, and form submission task. For example, assume that the /src/client/js/formHandler.js file has the following function to be tested:  

    ```javascript
    function handleSubmit(event) {
        event.preventDefault()
        // check what text was put into the form field
        let formText = document.getElementById('name').value
        Client.checkForName(formText)
        console.log("::: Form Submitted :::")
    }
    export { handleSubmit }
    ```

3. You have to ensure that all your custom functions in src/client/js directory can handle error responses if the user input does not match API requirements. You will write tests in ```<function_name>.test.js``` or ```<function_name>.spec.js``` file, to be present in a ```__test__``` folder. For each functionality, consider writing a separate test file. The ```__test__``` folder should be present in the project directory.

    In each test file, the general flow of the test block should be:

    - Import the js file to test
    - Define the input for the function. Note that, to keep it simple, we will not validate the input being provided to the test cases.
    - Define the expected output
    - Check if the function produces the expected output

    For the example function shown above, ```/src/client/js/formHandler/handleSubmit()```, you can write a test file ```testFormHandler.spec.js``` in the ```__test__``` directory, having a test block as:

        ```java script
        // Import the js file to test
        import { handleSubmit } from "../src/client/js/formHandler"
        ```

    ```javascript
    // The describe() function takes two arguments - a string description, and a test suite as a callback function.  
    // A test suite may contain one or more related tests    
    describe("Testing the submit functionality", () => {
        // The test() function has two arguments - a string description, and an actual test as a callback function.  
        test("Testing the handleSubmit() function", () => {
                // Define the input for the function, if any, in the form of variables/array
                // Define the expected output, if any, in the form of variables/array
                // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
                // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
                expect(handleSubmit).toBeDefined();
    })});
    ```

    You must be wondering about the matchers, and other syntactical information about test blocks. At this point, you must refer to the external resources:  
    - [Jest - Getting started](https://jestjs.io/docs/en/getting-started) - Provides a basic overview, with the help of an example.  
    - [Jest - matchers](https://jestjs.io/docs/en/using-matchers) - Read carefully to identify the suitable matcher for each of your functions.
    - [Jest - testing asynchronous code](https://jestjs.io/docs/en/asynchronous) - If you have code that runs asynchronously.
    - [A tutorial for beginners](https://www.valentinog.com/blog/jest/) - A good explanatory tutorial.

4. Configure an npm script named "test" in package.json to run your tests from the command line:

    ```javascript
    "scripts": {
        "test": "jest"
    }
    ```

    Also, ensure that the "devDependencies" in package.json have a suitable entry for Jest and others, such as, "jest": "^25.3.0",, where the version may vary with time.

5. Run the ```npm run test``` command.
