require("dotenv").config();
const express = require("express");
const mongoos = require("mongoose");

const express = require("express");
//API export calls
const userRouter = require('./router/users')
const authRouter = require('./router/auth')
const postRouter = require('./router/post')
const commentRouter = require('./router/comment')

const morgan = require("morgan");
const dotevn = require("dotenv");
const mongoos = require("mongoose");
const helmet = require("helmet");
const nodemon = require("nodemon");

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
dotevn.config();

const app = express();

//API Url 
app.use("/social/api/users",userRouter)
app.use("/social/api/auth",authRouter)
app.use("/social/api/post",postRouter)
app.use("/social/api/post/comment",commentRouter)


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
  res.send({ title: "Social App with monogooDB" });
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
