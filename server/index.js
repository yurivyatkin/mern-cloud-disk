const config = require('config');

const express = require('express');
const PORT = config.get('serverPort');
const mongoose = require('mongoose');

const app = express();

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log('Server started on port', PORT);
    });
  } catch (e) {
    // need to handle errors
  }
};

start();
