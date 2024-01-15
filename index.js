require("dotenv").config();
const express = require("express");
const mongoos = require("mongoose");
const userRouter = require("./router/users");
const authRouter = require("./router/auth");
const postRouter = require("./router/post");
const commentRouter = require("./router/comment");
const app = express();

const morgan = require("morgan");
const dotevn = require("dotenv");
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

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
dotevn.config();

//API Url
app.use("/social/api/users", userRouter);
app.use("/social/api/auth", authRouter);
app.use("/social/api/post", postRouter);
app.use("/social/api/post/comment", commentRouter);

app.get("/", (req, res) => {
  res.send({ title: "Welcome back to", name: "Social Connection" });
});

app.get("/social/api/logo", (req, res) => {
  res.send({ Image: "./assest/logo.png" });
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
