// implement your server here
// require your posts router and connect it here
const express = require("express");
const postsRouter = require("./posts/posts-router");
const server = express();

//applying json middleware
server.use(express.json());

//wiring the router to the server
server.use("/api/posts", postsRouter);

//catch all end point
server.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

module.exports = server;
