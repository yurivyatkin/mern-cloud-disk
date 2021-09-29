const config = require('config');

const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');

const corsMiddleware = require('./middleware/cors.middleware');

const PORT = config.get('serverPort');
const uri = config.get('dbUrl');
const staticPath = config.get('staticPath');

const app = express();

app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static(staticPath));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

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
