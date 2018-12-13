const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const itemRoutes = require('./routes');

const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' });

app.use(express.json());
app.use(
  morgan('tiny', {
    stream: accessLogStream
  })
);

//  apply a prefix to every route in itemRoutes
app.use('/items', itemRoutes);

// generic error handler
app.use(function(err, req, res, next) {
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

module.exports = app;
