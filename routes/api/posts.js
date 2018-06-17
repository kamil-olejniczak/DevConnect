const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validateUserPostInput = require("../../validation/post");

/**
 * @route GET api/posts
 * @desc Returns posts
 * @access Public
 **/
router.get('/', (req, res) => {
  Post.find()
    .sort({date: -1})
    .then(posts => {
      if (!posts) {
        errors.posts = "No posts found!";
        return res.status(404).json(errors);
      }
      return res.json(posts);
    })
    .catch(error => res.status(404).json(error));
});

/**
 * @route GET api/posts/:id
 * @desc Returns post by id
 * @access Public
 **/
router.get('/:id', (req, res) => {
  const errors = {};
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        errors.post = "Post with given id was nof found!";
        return res.status(404).json(errors);
      }
      return res.json(post);
    })
    .catch(error => res.status(404).json(error));
});

/**
 * @route POST api/posts/like/:id
 * @desc Likes post with specified id
 * @access Private
 **/
router.post('/like/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
  const errors = {};
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }
  Profile.findOne({user: req.user.id})
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile with given id in database!";
        return res.status(404).json(errors);
      }
      Post.findById(req.params.id)
        .then(post => {
          if (post === null) {
            errors.post = "Post with given id was nof found!";
            return res.status(401).json(errors);
          }
          if (userAlreadyLikedThatPost(post, req.user.id)) {
            errors.like = "Post already liked!";
            return res.status(400).json(errors);
          }

          post.likes.unshift({user: req.user.id});
          post.save()
            .then(post => res.json(post))
            .catch(error => res.status(404).json(error));
        })
        .catch(error => res.status(404).json(error));
    })
    .catch(error => res.status(404).json(error));
});

/**
 * @route POST api/posts/unlike/:id
 * @desc Unlikes post with specified id
 * @access Private
 **/
router.post('/unlike/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
  const errors = {};
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }
  Profile.findOne({user: req.user.id})
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile with given id in database!";
        return res.status(404).json(errors);
      }
      Post.findById(req.params.id)
        .then(post => {
          if (post === null) {
            errors.post = "Post with given id was nof found!";
            return res.status(401).json(errors);
          }
          if (!userAlreadyLikedThatPost(post, req.user.id)) {
            errors.like = "Post wasn't liked before!";
            return res.status(400).json(errors);
          }

          const indexToBeRemoved = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(indexToBeRemoved, 1);
          post.save()
            .then(post => res.json(post))
            .catch(error => res.status(404).json(error));
        })
        .catch(error => res.status(404).json(error));
    })
    .catch(error => res.status(404).json(error));
});

/**
 * @route POST api/posts
 * @desc Posts new user post
 * @access Private
 **/
router.post('/', passport.authenticate("jwt", {session: false}), (req, res) => {
  const {errors, isValid} = validateUserPostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    user: req.user.id,
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar
  });

  newPost
    .save()
    .then(post => res.json(post))
    .catch(error => res.status(404).json(error));
});

/**
 * @route POST api/posts/comment/:id
 * @desc Add comment to post
 * @access Private
 **/
router.post('/comment/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json("Given id is not proper!");
  }

  const {errors, isValid} = validateUserPostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        errors.post = "Post with given id was nof found!";
        return res.status(404).json(errors);
      }
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);
      post.save()
        .then(post => res.json(post))
        .catch(error => res.status(404).json(error));

    })
    .catch(error => res.status(404).json(error));
});

/**
 * @route DELETE api/posts/:id
 * @desc Deletes post by id
 * @access Private
 **/
router.delete('/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
  const errors = {};
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }
  Profile.findOne({user: req.user.id})
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile with given id in database!";
        return res.status(404).json(errors);
      }
      Post.findById(req.params.id)
        .then(post => {
          if (post === null) {
            errors.post = "Post with given id was nof found!";
            return res.status(401).json(errors);
          }
          if (post.user.toString() !== req.user.id) {
            errors.unauthorized = "User is not authorized to delete given post!";
            return res.status(401).json(errors);
          }
          post.remove()
            .then(() => res.json({postWasDeleted: true}));
        })
        .catch(error => res.status(404).json(error));
    })
    .catch(error => res.status(404).json(error));
});

/**
 * @route DELETE api/posts/comment/:id
 * @desc Deletes comment by id
 * @access Private
 **/
router.delete('/comment/:id/:comment_id', passport.authenticate("jwt", {session: false}), (req, res) => {
  const errors = {};
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        errors.post = "There is no post with given id in database!";
        return res.status(404).json(errors);
      }

      if (commentDoesNotExist(post, req.params.comment_id)) {
        errors.comment = "There is no comment with given id in database!";
        return res.status(404).json(errors);
      }

      const indexToBeRemoved = post.comments
        .map(comment => comment.id)
        .indexOf(req.params.comment_id);

      post.comments.splice(indexToBeRemoved, 1);
      post.save()
        .then(() => res.json({commentWasDeleted: true}))
        .catch(error => res.status(404).json(error))
    })
    .catch(error => res.status(404).json(error));
});

const userAlreadyLikedThatPost = (post, userId) => {
  return post.likes.filter(like => like.user.toString() === userId).length > 0;
};

const commentDoesNotExist = (post, commentId) => {
  return post.comments.filter(comment => comment._id.toString() === commentId).length === 0;
};

module.exports = router;
