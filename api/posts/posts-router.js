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

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((postData) => {
      if (!postData) {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else res.json(postData);
    })
    .catch(() => {
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else
    Posts.insert(req.body)
      .then(({ id }) => {
        return Posts.findById(id);
      })
      .then((newPost) => {
        res.status(201).json(newPost);
      })
      .catch(() => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
});

router.delete("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((toBeRemovedPost) => {
      if (!toBeRemovedPost) {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else return toBeRemovedPost;
    })
    .then((removedPost) => {
      Posts.remove(req.params.id).then(() => {
        console.log(removedPost);
        res.json(removedPost);
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "The post could not be removed",
      });
    });
});

router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
    return;
  }
  Posts.update(req.params.id, req.body)
    .then((post) => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else return Posts.findById(req.params.id);
    })
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch(() => {
      res.status(500).json({
        message: "The post information could not be modified",
      });
    });
});

router.get("/:id/comments", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
        return;
      } else return Posts.findPostComments(req.params.id);
    })
    .then((comments) => {
      res.json(comments);
    })
    .catch(() => {
      res.status(500).json({
        message: "The comments information could not be retrieved",
      });
    });
});

module.exports = router;
