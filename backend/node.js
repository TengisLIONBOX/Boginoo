// const express = require("express");
// const UserRouter = require("./router/userRouter");
// const { connectDatabse } = require("./databasee/database");

// const port = 8000;

// const app = express();
// app.use(express.json());

// app.use(UserRouter);

// app.get("/users", (req, res) => {
//   res.send("Get request is successfully.");
// });

// app.post("/", (req, res) => {
//   res.send("Post request is successfully.");
// });

// app.put("/", (req, res) => {
//   res.send("Put request is successfully.");
// });

// app.delete("/", (req, res) => {
//   res.send("Delete request is successfully.");
// });

// app.listen(port, () => {
//   console.log(`server is running at localhost:${port}`);
// });

const cors = require('cors');
const express = require('express');
const UserRouter = require('./router/router');
const { connectDatabse } = require('./databasee/database');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3333;

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRouter);

const startServer = async () => {
    await connectDatabse();
    app.listen(port, () => {
        console.log(`server is running at localhost:${port}`);
    });
};

startServer();
module.exports = app;
