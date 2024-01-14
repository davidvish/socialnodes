require("dotenv").config();
const express = require("express");
const mongoos = require("mongoose");
const userRouter = require('./router/users')
const authRouter = require('./router/auth')
const postRouter = require('./router/post')
const commentRouter = require('./router/comment')
const app = express();

const morgan = require("morgan");
const dotevn = require("dotenv");
const mongoos = require("mongoose");
const helmet = require("helmet");
const nodemon = require("nodemon");

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
  res.send({ title: "Social App Node Test t" });
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
