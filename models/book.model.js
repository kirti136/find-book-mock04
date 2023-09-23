const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    description: { type: String },
    price: { type: Number },
  },
  {
    versionKey: false,
  }
);

const BookModel = mongoose.model("Book", bookSchema);

module.exports = {
  BookModel,
};
