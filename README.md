# fullstack-open-2021
Contains exercises and attempts of tasks for Full Stack Web Development 2021 course (https://fullstackopen.com/en/)

All code are written with reference University of Helsinki's works. Actual course themselves can be found at the following links:

Code for exercises discussed in the course can be found at University of Helsinki's [GitHub repository](https://github.com/fullstack-hy/).

- Part 0: [Fundamentals of web applications](https://fullstackopen.com/en/part0/fundamentals_of_web_app)
- Part 1: [Introduction to React, JavaScript, Component state and event handlers, and how to debug React apps](https://fullstackopen.com/en/part1)
- Part 2: [Render data collection, forms, getting data and altering data in server](https://fullstackopen.com/en/part2)
- Part 3: [Implement REST API in Node.js using Express library and storing data into MongoDB](https://fullstackopen.com/en/part3)
- Part 4: [Structure of backend application, Testing the backend, User administration and Token Authentication](https://fullstackopen.com/en/part4)

- Part 5: [Login in Frontend, props.children and proptypes, Testing React apps, End to end testing](https://fullstackopen.com/en/part5)

## NPM Command

To run the web application locally, execute the following at project root folder:

```npm start```

To launch the development DB, execute the following at project root folder after installing developer version of DB server:

```npm run server```

To initialize a new, empty node application, perform the following at root folder:

```npm init```

You can also run program directly from node with the following:

```node index.js```

or run it as an npm script (but we first have to define it in `package.json` file):

```npm start```

Likewise, the following command executes the scripted command in `package.json` with key `test`:

```npm test```

Execute the following to install project dependency (eg. installing Express). This will add dependency into `package.json` file and install source code of the library along with all other transitive dependencies to `node_modules` directory in project root:

```npm install express``

Dependencies of project can be updated using:

```npm update```

If all the dependencies are pre-defined in `package.json` file, execute the following to install all the dependencies at once:

```npm install```

To test out JS code, we can use `node-repl`. The interactive mode can be initiated by:

```node```

To create production build for app serving， run the following to create a new directory `build` with minified version of our code:

```npm run build```

## nodemon command

`nodemon` saves us the trouble of restarting the server everytime changes are made. But we need to first install it into the project root by:

```npm install --save-dev nodemon```

`--save-dev` allows libraries that are only needed for development (referred to as development dependencies) to be installed and will not be installed during production mode on production server. We can manually start application with nodemon using the following:

```node_modules/.bin/nodemon index.js```

Else we can also define it in `package.json` to save typing hassles. To start server in development mode, execute the following:

```npm run dev```

## Install json-server
```npx json-server --port 3001 --watch db.json```

## Configuring Environment Variables

Environment variables can be configured in `.env` file. Ensure that there are no spaces between assignment operators.

Also, you have to install `dotenv` library.

```npm install dotenv```

The environment variables can then be imported with:

```require('dotenv').config()```

and referencing it with:

```process.env.<VARIABLE>```

## ESlint

The most popular linting library, install with:

```npm install eslint --save-dev```

Initialize a default ESlint configuration with:

```node_modules/.bin/eslint --init```

Inspecting and validating a file like `index.js` can be done using:

```node_modules/.bin/eslint index.js```

Better to create a separate `npm script` for linting by:
```"lint": "eslint ."```

We also can configure which file to ignore during linting in `.eslintignore` file.

When changes are made to `.eslintrc.js` file, please run the linter for the first time from command line to mitigate any complexities.

## Heroku Commands

To list the list of apps along with info:

```heroku apps:info```

To set an environment in Heroku kernel:

```$ heroku config:set MONGODB_URI=something```

## Jest

Jest is the JS testing framework used internally by Facebook, especially suitable for React.

Commands to execute tests have been defined in `npm`, you can run all tests by:

```npm test```

Alternatively, to just run a single test (or describe block), do:

```npm test -- -t <test_name>```

Caveats with testing mongoose using `Jest`: https://mongoosejs.com/docs/jest.html

## Other Libraries

- `supertest`: help in writing tests for testing the API
- `cross-env`: to solve cross-platform compality issue when defining node environment
- `express-async-errors`: to help refactor code to elinate try/catch structure
- `bcrypt`: for generating password hashes
- `mongoose-unique-validator`: for checking the uniqueness of a field for MongoDB
- `jsonwebtoken`: to generate JSON web tokens
- `prop-types`: to ensure a prop as mandatory or required string-type prop
- `eslint-plugin-jest`: to avoid undesired and irrelevant linter errors when testing frontend
- `@testing-library/react` & `@testing-library/jest-dom`: to test React app (by default it runs in watch mode. To execute only once, use `CI=true npm test`. To find out coverage of tests: `CI=true npm test -- --coverage`)
- `cypress`: end-to-end testing library. It requires some extra configurations on the system to work. Guide can be found at https://docs.cypress.io/guides/continuous-integration/introduction#Dependencies .

It could be kinda tricky if you are remoting a WSL. Try to follow the guide [here](https://gist.github.com/alextsil/f8d861b8a2fc766c06aefc0c35c083ee) for enabling GUI display on WSL.
-`eslint-plugin-cypress`: Plugin of `eslint` for `cypress`

## Probles of Token-based Authentication

API would have blind trust to token holder, and mechanism should be put in-place to revoke access rights of token holder.

Two solutions for this:
1. Limiting validity period of a token by client-side (client side session)
2. Saving each token to backend database and to check for each API request if the access right corresponding to the token is still valid.
+ The server can revoke access rights of token anytime (server side session).
- Performance taken a hit as DB access is needed, usually Redis is used for such scenarios where speed is required.

Instead of Authorization-header, cookies are also commonly used as mechanism for transferring token between the client and server.

## Testing
There are different kinds of testing:
- Unit testing
- Integration testing
- End-to-end testing
- Snapshot testing