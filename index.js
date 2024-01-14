require("dotenv").config();
const express = require("express");
const mongoos = require("mongoose");
const Book = require("./models/book");

const app = express();

const PORT = process.env.PORT || 3000;

mongoos.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoos.connect(process.env.MONGO_URL);
    console.log(`Mongodb connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.send({ title: "Social App Node js Test" });
});

app.get("/add-node", async (req, res) => {
  try {
    await Book.insertMany[
      ({
        title: "Sone of Book",
        body: "Body Text Check",
      },
      {
        title: "Sone of Book",
        body: "Body Text Check",
      })
    ];
    res.send('Added Data')
  } catch (error) {
    console.log(error);
  }
});

app.get("/books", async (req, res) => {
  const book = await Book.find();
  if (book) {
    res.json(book);
  } else {
    res.send("Something went wrong.");
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
