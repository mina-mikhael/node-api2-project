// require your server and launch it here
const express = require("express");

const server = express();

const port = 9000;

server.listen(port, () => {
  console.log(`magic happens here as port ${port} is listening`);
});
