# Setting up the API

Steps copied and modified from the UDACITY project instructions: <https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0430/modules/a7b8c3f1-787c-4a2b-9922-eb0a39dfe040/lessons/fbeb5d3c-437b-444a-86c2-b9e0962e2194/concepts/635945f9-c775-45fe-a398-3d381b45d9c8>

Project API: MeaningCloud -- <https://www.meaningcloud.com/developer/sentiment-analysis>

## STEP 1. SIGNING UP FOR THE API

You need to sign up for your personal API KEY, go to the website, create an account and access the developer information.

---

## STEP 2. CREATING ENVIRONMENT VARIABLES

Next, in server/index.js, you need to declare your API credentials, which will look something like this:

```
// You could call it aylienapi, or anything else
var textapi = new aylien({
application_id: "your-api-id",
application_key: "your-key"
});
```

If you are using the MeaningCloud API, the process will look pretty similar to the Aylien API process, but you don’t need to use an application_id.

...But there's a problem with this. We are about to put our personal API keys into a file, but when we push, this file is going to be available PUBLICLY on Github. Private keys, visible publicly, are never a good thing. So, we have to figure out a way to make that not happen.

The way we will do that is with environment variables. Environment variables are pretty much like normal variables in that they have a name and hold value. The environment variables only belong to your local system and won't be visible when you push your code to a different environment like Github. Follow the steps below to configure environment variables:

1. Use npm to install the dotenv package to allow us to use environment variables we set in a new file:

    ```
    npm install dotenv
    ```
    *Note: Here I installed an old compatible version of dotenv, version 8.0.0.*


2. Create a new ```".env"``` file in the root of your project. The full name of the file is just ```".env"``` without any extension. Just create a file called ```".env"```.

    Created as "apiKey.env"

3. Fill the ```".env"``` file with your API keys like this:

    ```
    API_ID=**************************
    API_KEY=**************************
    ```

4. Add this code to the very top of your server/index.js file:  

    ```
    const dotenv = require('dotenv');
    dotenv.config();
    ```

5. If you want to refer the environment variables, try putting a prefix process.env. in front of the variable name in the server/index.js file, an example might look like this:

    ```
    console.log(`Your API key is ${process.env.API_KEY}`);
    ```

    The step above is just to help you understand how to refer an environment variable from your code. In server/index.js, your updated API credential settings should look like this:  

    ```
    // You could call it aylienapi, or anything else
    var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
    });
    ```

6. Go to your .gitignore file, in the project root, and add .env. It will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys would become pointless.

---

## STEP 3. USING THE API

We're ready to go!
You can also check out the documentation of the MeaningCloud API here -- <https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1>

 MeaningCloud also has several other APIs, which we won’t be using for this project, but feel free to take a look around if you’re curious!

Now it's up to you to create the various requests and make sure your server is set up appropriately. For example, ensure that the "dependencies" in package.json have a suitable entry for Aylien, such as, "aylien_textapi": "^0.7.0",, where the version may vary with time.
