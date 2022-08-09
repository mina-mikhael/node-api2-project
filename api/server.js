// implement your server here
// require your posts router and connect it here
const express = require("express");
const router = require("./posts/posts-router");
const server = express();

//applying json middleware
server.use(express.json());

//wiring the router to the server
server.use("/api/posts", router);

module.exports = server;
