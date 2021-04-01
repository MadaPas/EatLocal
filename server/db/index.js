/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const connectDB = async () => {
  try {
    const connectDb = await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${connectDb.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports.connectDB = connectDB;
