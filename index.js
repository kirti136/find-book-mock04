require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const { bookRouter } = require("./routes/book.route");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/book", bookRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Book Find" });
});

let PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on ${PORT}`);
});
