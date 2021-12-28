const express             = require('express');
const morgan              = require('morgan');
const helmet              = require('helmet');
const cors                = require('cors');
const {
  requestLogStream
}                         = require('./logs');
const { 
  invalidEndpointHandler,
  errorHandler
}                         = require('./middlewares');
const { recordsRouter }   = require('./routes');

const app                 = express();

app.use(cors({ methods: '*', origin: '*' }));
app.use(helmet());
app.use(express.json());
// Log requests into requests.log file via write stream with the help of Morgan
app.use(morgan('combined', { stream: requestLogStream }));
app.use(morgan('dev'));

app.use('/api/v1/records', recordsRouter);

// Handle requests to unknown endpoints by delegating them to the global error handler middleware
app.all('*', invalidEndpointHandler);
// Use the global error handler middleware
app.use(errorHandler);

module.exports = app;