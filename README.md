# fullstack-open-2021
Contains exercises and attempts of tasks for Full Stack Web Development 2021 course (https://fullstackopen.com/en/)

All code are written with reference University of Helsinki's works. Actual course themselves can be found at the following links:

Code for exercises discussed in the course can be found at University of Helsinki's [GitHub repository](https://github.com/fullstack-hy/).

- Part 0: [Fundamentals of web applications](https://fullstackopen.com/en/part0/fundamentals_of_web_app)
- Part 1: [Introduction to React, JavaScript, Component state and event handlers, and how to debug React apps](https://fullstackopen.com/en/part1)
- Part 2: [Render data collection, forms, getting data and altering data in server](https://fullstackopen.com/en/part2)
- Part 3: [Implement REST API in Node.js using Express library and storing data into MongoDB](https://fullstackopen.com/en/part3)

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