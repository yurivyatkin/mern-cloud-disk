const config = require('config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = config.get('serverPort');
const uri = config.get('dbUrl');

const start = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log('Server started on port', PORT);
    });
  } catch (e) {
    // need to handle errors
  }
};

start();
