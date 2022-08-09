// implement your posts router here
const express = require("express");
const Posts = require("./posts-model");
const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then((postsData) => {
      res.json(postsData);
    })
    .catch(() => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

module.exports = router;
