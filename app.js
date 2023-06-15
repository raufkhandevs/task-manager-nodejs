const express = require('express');
const databaseConnection = require('./db/connect');
const tasksRouter = require('./routes/tasks');
const notFound = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
require('dotenv').config();

// vars
const app = express();
const port = process.env.PORT || 3000;
const databaseConnectionString = process.env.DATABASE_URI;

// configs
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

// server
const initServer = async () => {
  try {
    await databaseConnection(databaseConnectionString);
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

initServer();
