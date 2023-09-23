const { Router } = require("express");
const { BookModel } = require("../models/book.model");
const bookRouter = Router();

// Add Book API
bookRouter.post("/add-book", async (req, res) => {
  try {
    const { title, author, genre, description, price } = req.body;
    const newBook = new BookModel({ title, author, genre, description, price });
    await newBook.save();
    res.status(200).json({ message: "New Book Added", newBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add book", error: error.message });
  }
});

// Retrieve Books API
bookRouter.get("/retrive-book", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to Get Data", error: error.message });
  }
});

// Delete Book API
bookRouter.delete("/delete-book/:id", async (req, res) => {
  try {
    const bookID = req.params.id;
    const deletedBook = await BookModel.findByIdAndDelete(bookID);
    res.status(200).json({ message: "Book Deleted", deletedBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to Delete Data", error: error.message });
  }
});

// Filter Books API
bookRouter.get("/filter-book", async (req, res) => {
  try {
    const { genre } = req.query;

    const books = await BookModel.find({ genre: genre });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sort Books API
bookRouter.get("/sort-book", async (req, res) => {
  try {
    const { sort } = req.query;

    const books = await BookModel.find().lean();
    let sortedData;

    if (sort === "desc") {
      sortedData = books.sort((a, b) => b.price - a.price);
    } else {
      sortedData = books.sort((a, b) => a.price - b.price);
    }

    res.status(200).json(sortedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  bookRouter,
};
