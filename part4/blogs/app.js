const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

const app = express();

logger.info('Connecting to MongoDB...');
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => logger.info('Connected to MongoDB'))
  .catch((e) => logger.error(`Error connecting to MongoDB: ${e.message}`));

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
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
      ].join(' ');
    }),
  );
}

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
