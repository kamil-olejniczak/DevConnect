const express = require("express");
const router = express.Router();
const passport = require("passport");
const postsController = require('../../controllers/posts');
const catchAsync = require('../../middleware/error');

/**
 * @route GET api/posts
 * @desc Returns posts
 * @access Public
 **/
router.get('/', catchAsync(postsController.getPosts));

/**
 * @route GET api/posts/:id
 * @desc Returns post by id
 * @access Public
 **/
router.get('/:id', catchAsync(postsController.getPostById));

/**
 * @route POST api/posts
 * @desc Posts new user post
 * @access Private
 **/
router.post('/', passport.authenticate("jwt", {session: false}), catchAsync(postsController.addPost));

/**
 * @route POST api/posts/like/:id
 * @desc Likes post with specified id
 * @access Private
 **/
router.post('/like/:id', passport.authenticate("jwt", {session: false}), catchAsync(postsController.likePostById));

/**
 * @route POST api/posts/unlike/:id
 * @desc Unlikes post with specified id
 * @access Private
 **/
router.post('/unlike/:id', passport.authenticate("jwt", {session: false}), catchAsync(postsController.unlikePostById));

/**
 * @route POST api/posts/comment/:id
 * @desc Add comment to post
 * @access Private
 **/
router.post('/comment/:id', passport.authenticate("jwt", {session: false}),
  catchAsync(postsController.addCommentToPostById));

/**
 * @route DELETE api/posts/:id
 * @desc Deletes post by id
 * @access Private
 **/
router.delete('/:id', passport.authenticate("jwt", {session: false}), catchAsync(postsController.deletePostById));

/**
 * @route DELETE api/posts/comment/:id/:comment_id
 * @desc Deletes comment by id
 * @access Private
 **/
router.delete('/comment/:id/:comment_id', passport.authenticate("jwt", {session: false}),
  catchAsync(postsController.deleteCommentByPostThenByCommentId));

module.exports = router;
