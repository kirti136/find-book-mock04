require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoURL);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  connectDB,
};
