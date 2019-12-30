# Electron

## Dev

1. React codebase

   ```sh
   $yarn create react-app .
   ```

1. Electron deps

   - electron - allows us to use the electron framework.
   - electron-builder - allows us to build the electron app to executable.
   - wait-on - lets u wait on react to compile during development so as to render it with electron.
   - concurrently - allows us to run both react and electron concurrently.
   - electron-is-dev - tells electron the current environment we are working to decide either
     serve the build or render the react app running on dev environment.

   ```sh
   $yarn add electron electron-builder wait-on concurrently -D
   $yarn add electron-is-dev
   ```

1. Start app

   - create public/electron.js
   - the next script will wait until CRA compiles the react app then starts the electron app.
     A new tab on browser wasn't opened, because of the environment(BROWSER=none).
     Also point where the electron logic code lies

   ```json
   "main": "public/electron.js"
   "electron-dev": "concurrently \"BROWSER=none yarn start\" \"wait-on http://localhost:3000 && electron .\""
   ```

   - start

   ```sh
   $yarn electron-dev
   ```

1. FS issue

   - if you need to access the fs module, you'll quickly hit the Module not found error.
     it can be solved with the use of electron-renderer as the Webpack target via lib called Rescripts

     ```sh
     $yarn add @rescripts/cli @rescripts/rescript-env -D
     ```

   - We will also have to change the script tags

   ```json
    "start": "rescripts start",
    "build": "rescripts build",
    "test": "rescripts test"
   ```

   - add the .rescriptsrc.js file in your root folder

   ```js
   module.exports = [require.resolve("./.webpack.config.js")];
   ```

   - add the .webpack.config.js file in your root folder

   ```js
   module.exports = config => {
     config.target = "electron-renderer";
     return config;
   };
   ```

## Packaging

1. Electron deps

   - electron-builder - to package the app with all of its dependencies.
   - typescript - electron-builder is dependent on typescript (no need to use in code)

   ```sh
   $yarn add electron-builder typescript -D
   ```

1. Need to configure:

   - the homepage route because when react builds it uses absolute paths,
     and electron doesn't do absolute path.
   - author
   - build

   ```json
   "homepage": "./",
   "author": {
       "name": "Your Name",
       "email": "your.email@domain.com",
       "url": "https://your-website.com"
   },
   "build": {
       "appId": "com.my-website.my-app",
       "productName": "MyApp",
       "copyright": "Copyright © 2019 ${author}",
       "mac": {
           "category": "public.app-category.utilities"
       },
       "files": [
           "build/**/*",
           "node_modules/**/*"
       ],
       "directories": {
           "buildResources": "assets"
       }
   }
   ```

1. Icons
   You will also want to create a directory called assets where you will add your app icons.
   Check [Icons](https://www.electron.build/icons) to see the formats for these icons.

1. Add the the following scripts

   - postinstall - ensure that your dependencies always match the electron version
   - preelectron-pack - will build the react app
   - electron-pack - only generates the package dir without really packaging it.
     This is useful for testing purposes.
   - electron-dist - package in a distributable format (e.g. dmg, win installer, deb))

   ```json
   "postinstall": "electron-builder install-app-deps",
   "preelectron-pack": "yarn build",
   "electron-pack": "electron-builder --dir",
   "electron-dist": "electron-builder"
   ```

1. Package the app

   ```sh
   yarn electron-pack
   ```
