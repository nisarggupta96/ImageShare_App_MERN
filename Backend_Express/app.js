const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes.js');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

//Error handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'Something went wrong' });
});

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL).then(() => {
  app.listen(5000);
}).catch((e) => {
  console.log(e);
});
