const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');

const app = express();

logger.info('Connecting to MongoDB...');
mongoose
.connect(config.MONGODB_URI, { family: 4 })
.then(() => logger.info('Connected to MongoDB'))
.catch((e) => logger.error(`Error connecting to MongoDB: ${e.message}`));


app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ');
  }),
);

app.use('/', blogsRouter)

module.exports = app;
