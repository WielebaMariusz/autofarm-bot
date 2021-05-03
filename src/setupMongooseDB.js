const mongoose = require('mongoose');

async function setupMongooseDB() {
  const dbURI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.k4l7n.mongodb.net/autofarm-coins?retryWrites=true&w=majority`;

  return await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = setupMongooseDB;
