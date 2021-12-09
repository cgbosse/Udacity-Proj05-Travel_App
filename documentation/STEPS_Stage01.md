# Steps to be taken to set up Webpack

## Important Note on the NodeJS Version for this Project
Udacity created this project with an old version of NODE.
To avoid problems use the previous NODE version 11.15.0.
In order to be able to use it and downgrad or upgrade your version here is a good article on the topic: <https://heynode.com/tutorial/install-nodejs-locally-nvm/>

### A)  Essentially the steps are the following in terminal - you will need administrator rights:

1. To list your installed NODE versions:
    ```
    nvm ls 
    ```
2. To install the version you require in this case 11.15.0:
    ```
    nvm install 11.15.0
    ```
3. Once installed select it:
    ```
    nvm use 11.15.0
    ```

## Configuring SASS
These are the steps to set up Webpack following the indications from the course, starting out with the base installation as per branch Stage 01 following the rubric.

Already installed packages in the course boiler plate:

> #Choose the necessary installation for your development mode
>> npm i -D @babel/core @babel/preset-env babel-loader  
>> npm i -D style-loader node-sass css-loader sass-loader  
>> npm i -D clean-webpack-plugin  
>> npm i -D html-webpack-plugin  
>> npm i -D mini-css-extract-plugin  
>> npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin

## Steps from Lesson 2 till Lesson 4

### Lesson 2

---

1. Run npm install
2. Check installation of webpack and webpack-cli
3. Check entry point in the webpack config files for dev and prod
4. Check the existence of an index.js file inside of the './client/'

5. Run in terminal npm run build-prod and check that it generates de './dist/' folder and that it contains the 'main.js' file with all the bundled content.

6. To check all the included files in webpack you can run:

    ```text
    webpack --display-modules
    ```

    or

    ```text
    webpack --json > info.json
    ```

    The last command generates a json file in the project folder.

#### Loaders

---
Note:

Webpack, a bundler is only prepared to handle JS files. It needs to preprocess all the other files and assets before it gets bundled.

Loaders are translators for Webpack. They are transformations that are applied on the source code of a module. Basically loaders allow you transform files from a different language to javascript, or inline images as data URLs, import CSS files directly from your JavaScript modules, etc.

Good article: <https://medium.com/js-imaginea/webpack-why-and-what-4948433cc2d3>

7. Check if babel is installed otherwise:

    ```
    npm i -D @babel/core @babel/preset-env babel-loader
    ```

    otherwise:
    1. Create a file in the project folder called .babel.rc
    2. Enter the following code:

        ```text
        { ‘presets’: ['@babel/preset-env'] }
        ```

    3. Getting Webpack to use BABEL in the webpack config file:

        ```
        module: {
            rules: [
                    {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
                    }
            ]
        }
        ```

#### Importing JS files

---
Note:  
Each JS file needs to include an export note and in index.js one need to show the import note.

    4. Importing Java Script files into index.js
        ```
        import { checkForName } from './js/nameChecker'
        import { handleSubmit } from './js/formHandler'

        console.log(checkForName);

        alert("I EXIST")    
        ```

> ## Not included in the starter files
>
> 8. Hardcode a reference to the javascript in the index.html file:
>
>    ```text
>    <script type="text/javascript" src="../../../dist/main.js"></script>
>    ```
>  

9. Check the export of the JS files in the client folder with the appropriate commands for export:

    ```
    export { function_name }
    ```

10. Check the import of the JS files in the index.js file:

    ```
    import { function_name } from './js/filename'
    ```

11. When running build-prod delete the './dist/' folder each time before. This can also be done by using terminal:

    ```text
    rm -rf dist 
    ```

12. Check once the build procedure has been completed that within the text the js files names show up. As long as they show up in the build text all is ok since it is likely that these will not be found in the main.js.

#### Importing JS files

---
Note:  
While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

13. Install the html-webpack-plugin

    ```
    npm i -D html-webpack-plugin
    ```

14. Require theplugin at the top of your webpack config

    ```
    const HtmlWebPackPlugin = require('html-webpack-plugin')
    ```
15. Instantiate the plugins list in the webpack config file and this plugin.
    ```
    plugins: [
    new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
    })
    ]
    ```

>## Not included in the starter files
>16. Run webpack and observe the new dist folder output and 
>Update your server file. Change the home route to use the index file from dist.
>    ```
>    app.get('/', function (req, res) {
>        res.sendFile('dist/index.html')
>    })
>    ```

17. Update your server file to look for asset files in the dist instead of client.

    Change:
    ```
    app.use(express.static('src/client'))
    ```
    To:
    ```
    app.use(express.static('dist'))
    ```

#### Mode - Completed in the Project Boiler Plate

---
Note:  
The mode configuration setting defines whether a build is made in development mode or in production mode.

18. Inside of the webpack configuration file one needs to include the mode setting to indicate which mode's configuration it is. One has to define a configuration file for each of the two build modes, development and production.
Also one will have to have one configuration file for each of the modes.

    ```text
    mode: 'development',
    devtool: 'source-map',
    ```
19. Once the previous step has been completed one has to include the following into the package.json file:
    ```text
    "scripts": {
        "build-prod": "webpack --config webpack.prod.js",
        "build-dev": "webpack-dev-server  --config webpack.dev.js --open"
    },    
    ```

20. If a previous build configuration was present such as "build": "webpack".

#### Convenience - Webpack Dev Server & Clean Webpack Plugins & SourceMaps

---
Note:  
Useful plugin for development testing.

21. Inside the Webpack Dev configuration file one can install these convenient plugins.

a. Run:
```
npm i -D webpack-dev-server
npm i -D clean-webpack-plugin
```
b. In package.json include this in the "build-dev" Script:
```
webpack-dev-server --config webpack.dev.js --open
```

c. Include:
- In the top with the other variables:
    ```
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    ```
- The in the plugin section: 
    ```
      new CleanWebpackPlugin()
    ```
    or with some specific options:

    ```
       new CleanWebpackPlugin({
                // Simulate the removal of files
                dry: true,
                // Write Logs to Console
                verbose: true,
                // Automatically remove all unused webpack assets on rebuild
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false
        })
    ```
### Additional resources & Links from the Lesson chapters
##### <01>

Library examples

- Bootstrap -- <https://getbootstrap.com/docs/4.5/getting-started/introduction/>
- Bootstrap Tooltip examples -- <https://getbootstrap.com/docs/4.1/components/tooltips/#examples>
- Bootstrap Modal -- <https://getbootstrap.com/docs/4.1/components/modal/>
- Parallax -- <https://simpleparallax.com/>

#### <02>

- Webpack Express Example App - Github repository -- <https://github.com/udacity/fend-webpack-content>

#### <08>

- Webpack introductory documentation -- <https://webpack.js.org/concepts/>

#### <10>

- Webpack loader documentation -- <https://webpack.js.org/loaders/>
- ECMAScript 6 - New Feature,: Overview & Comparison -- <http://es6-features.org/#Constants>

#### <11> - To-do -- Test installing these

- JSON loader -- <https://webpack.js.org/loaders/json-loader/>
- Eslint loader -- <https://webpack.js.org/loaders/eslint-loader/>
- File Loader -- <https://webpack.js.org/loaders/file-loader/>

##### <17>

- Webpack Dev Server -- <https://webpack.js.org/configuration/dev-server/>
- Clean Plugin -- <https://github.com/johnagan/clean-webpack-plugin>


##### <18>

1. Multiple entry points with webpack -- <https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points>
2. Using webpack to be more efficient with your styles and assets -- <https://www.jonathancreamer.com/advanced-webpack-part-1-the-commonschunk-plugin/>
3. Cache busting with webpack -- <https://webpack.js.org/guides/caching/>

### Lesson 3 - Sass
CSS extension language that creates efficient use approaches in applications. Sass files have the following file format : .scss

Important concepts from Sass to read through:
- Nesting
- Variables
- Partials

1. Rename all the CSS files in the './client/styles/' folder to .scss rather thann .css .

2. Installing Sass:
    ```
    npm i -D style-loader node-sass css-loader sass-loader
    ```
    Note: the latest sass-loader has some breaking changes. We recommend to use the versions of the dependencies from package.json to avoid errors when running webpack build script.

3. Setting it up in the webpack config files' rules :

    ```
    {
            test: /\.scss$/,
            use: [ 'style-loader', 'css-loader', 'sass-loader' ]
    }
    ```
4. Import the Sass files into the index.js
    ```
    import './styles/resets.scss'
    import './styles/base.scss'
    import './styles/footer.scss'
    import './styles/form.scss'
    import './styles/header.scss'
    ```

### Additional resources & Links from the Lesson chapters

#### <01>
- Sass -- <https://sass-lang.com/>
- Sass Basics Tutorial -- <https://sass-lang.com/guide> 
#### <06>
- Loading images -- <https://medium.com/a-beginners-guide-for-webpack-2/handling-images-e1a2a2c28f8d>
- Working in typescript or other languages that compile to javascript -- <https://webpack.js.org/guides/typescript/>
- Working with third party style and js libraries like Bootstrap -- <https://getbootstrap.com/docs/4.0/getting-started/webpack/>
#### <09>
- Sass Documentation -- <https://sass-lang.com/documentation>
- Learn to style HTML using CSS -- <https://developer.mozilla.org/en-US/docs/Learn/CSS>

### Lesson 4 - Fixing Functionality

1. Fixing the apps functionality:

-  As we will start the Express server on a different port, we have to make familiar changes in the webpack.prod.js. Add the rule for sass files, like below:
    ```
         {
             test: /\.scss$/,
             use: [ 'style-loader', 'css-loader', 'sass-loader' ]
         }
    ```
- In webpack.prod.js as well as webpack.dev.js, add a new section in module.exports as:
    ```
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    ```

- In client/index.js, add the export statement:
    ```
    export {
    checkForName,
    handleSubmit
    }
    ```
- In client/views/index.html, confirm that the custom handleSubmit() function references the newly created Client library, as:  
         ```
         <section>
             <form class="" onsubmit="return Client.handleSubmit(event)">
                 <input id="name" type="text" name="input" value="" onblur="onBlur()" placeholder="Name">
                 <input type="submit" name="" value="submit" onclick="return Client.handleSubmit(event)" onsubmit="return handleSubmit(event)">
             </form>
         <section>
         ```
- In client/js directory, confirm that the javascript function calls refer to the Client library. In formHandler.js:
    ```
    Client.checkForName(formText)
    ```
- Change the port number in the fetch request in the formHandler.js to 8081 (The change in ports is to be able to have the Development server and the production server run at the same time.
    ```
    fetch('http://localhost:8081/test')
    .then(res => {
        return res.json()
    })
    .then(function(data) {
        document.getElementById('results').innerHTML = data.message
    })
    ```
- Change the port number in server/index.js to 8081 as well:
    ```
    // designates what port the app will listen to for incoming requests
    app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
    })
    ```
- Open two terminal, one for the webpack dev server, and another for Express in production mode. In terminal 1, run the following commands:
    ```
    // If you have switched to a new branch
    npm install
    ```
    ```
    // Optional installation for development mode
    npm i -D @babel/core @babel/preset-env babel-loader
    npm i -D style-loader node-sass css-loader sass-loader
    npm i -D clean-webpack-plugin
    npm i -D html-webpack-plugin
    ```
    // Build and start the webpack dev server at port 8080
    npm run build-dev
    ```
- In terminal 2, run the following commands:
    ```
    // generate a `dist` folder for prod
    npm run build-prod
    // Run the Express server on port 8081
    npm start 
    ```
#### Section 4 - Create API call not included just practice exercise without 

#### Section 5  - Webpack for Production 
1.  Add the new plugins using npm to install to "devDependencies".
    In the course:
    ```
    npm install --save-dev mini-css-extract-plugin terser-webpack-plugin@4 optimize-css-assets-webpack-plugin
    ```
    In the exercise:
    ```   
    npm install mini-css-extract-plugin
    npm install optimize-css-assets-webpack-plugin
    npm install terser-webpack-plugin
    ```
    **NOTE.** The plugins in this course, configured as shown above, are only tested with Webpack version 4.
    Upgrading to Webpack version 5 might require you to update other plugins or edit configuration code. 
    For instance, if you are using Webpack 5, you will need to install terser-webpack-plugin@5 to avoid errors.

2.  In webpack.prod.js config file, append the new plugin statements:
    ```
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
    const TerserPlugin = require('terser-webpack-plugin');
    ```
- Add the optimization attribute in module.exports section, that will help us to minimize certain files. Notice that the TerserPlugin and OptimizeCSSAssetsPlugin are being initialized here.
    ```
    optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    ```
- Updated the rule section for Sass file loaders:
    ```
    {
    test: /\.scss$/,
    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    },
    ```
- Instantiate the new plugin in the plugin list:
    ```
    new MiniCssExtractPlugin({ filename: "[name].css" })
    ```
3. On the terminal, run the following commands:
    ```
    npm i -D mini-css-extract-plugin
    npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin
    npm run build-prod
    ```
#### 6 - Exercise: Dev Tools Challenge - 

#### 7 - Service Workers
1. Install the workbox plugin:
    ```
    npm install workbox-webpack-plugin
    ```
2. Add a service worker script to index.html at the bottom after the footer but still in the body.
    ```
    <script>
    // Check that service workers are supported
    if ('serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js');
        });
    }
    </script>
    ```
3. Update webpack.prod.js to include the workbox plug-in
   At the top of the file, add:
    ```
    const WorkboxPlugin = require('workbox-webpack-plugin')
    ```
    Make sure module.exports includes:
    ```
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    ```
    Then add the plugin near the bottom.
    ```
    new WorkboxPlugin.GenerateSW()
    ```
    Run your server (production version), refresh the page a few times
    
    Turn off the server in your terminal (use Control+C this time instead of "Close App" below, or else your app window will close).

    Go back to your web page and refresh
    You’ve been successful if you still see your webpage!


### Additional resources & Links from the Lesson chapters

#### <01>
1. IIFE -- <https://developer.mozilla.org/en-US/docs/Glossary/IIFE>
- They keep variables out of the global scope
- They run directly after being defined, so you don’t have to name them
- When you use them, you don't have to worry about variables you write overlapping with variables from third party code

<5>
- Webpack - Production Notes -- <https://webpack.js.org/guides/production/>
- DRY principle -- <https://en.wikipedia.org/wiki/Don%27t_repeat_yourself>

<9>
- Code splitting/lazy loading (spoiler - they're the same thing in webpack) -- <https://webpack.js.org/guides/code-splitting/>
- Tree shaking or dead code elimination -- <https://webpack.js.org/guides/tree-shaking/>
- A list of plugins and tutorials for more webpack fun -- <https://github.com/markerikson/react-redux-links/blob/master/webpack-advanced-techniques.md>
- If you want to hear someone who works for Webpack explain webpack, here’s a video -- <https://www.netlify.com/blog/2017/01/03/4-key-concepts-of-webpack/>