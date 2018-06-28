const Post = require("../models/Post");
const Profile = require("../models/Profile");
const validateUserPostInput = require("../validation/post");

async function getPosts(req, res) {
  const errors = {};
  const posts = await Post.find().sort({date: -1});
  if (posts.length === 0) {
    errors.posts = "No posts found!";
    return res.status(404).json(errors);
  }
  res.json(posts);
}

async function getPostById(req, res) {
  const errors = {};
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    errors.post = "Post with given id was nof found!";
    return res.status(404).json(errors);
  }
  res.json(post);
}

async function addPost(req, res) {
  const {errors, isValid} = validateUserPostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    avatar: req.body.avatar,
    name: req.body.name,
    text: req.body.text,
    user: req.user.id
  });

  const post = await newPost.save();
  res.json(post);
}

async function likePostById(req, res) {
  const errors = {};
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }
  const profile = await Profile.findOne({user: req.user.id});
  if (!profile) {
    errors.profile = "There is no profile with given id in database!";
    return res.status(404).json(errors);
  }
  const post = await Post.findById(req.params.id);
  if (post === null) {
    errors.post = "Post with given id was nof found!";
    return res.status(401).json(errors);
  }
  if (userAlreadyLikedThatPost(post, req.user.id)) {
    errors.like = "Post already liked!";
    return res.status(400).json(errors);
  }

  post.likes.unshift({user: req.user.id});
  await post.save();
  const posts = await Post.find().sort({date: -1});
  res.json(posts);
}

async function unlikePostById(req, res) {
  const errors = {};
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }
  const profile = await Profile.findOne({user: req.user.id});
  if (!profile) {
    errors.profile = "There is no profile with given id in database!";
    return res.status(404).json(errors);
  }
  const post = await Post.findById(req.params.id);
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
  const savedPost = await post.save();
  res.json(savedPost);
}

async function addCommentToPostById(req, res) {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json("Given id is not proper!");
  }

  const {errors, isValid} = validateUserPostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const post = await Post.findById(req.params.id);
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
  const savedPost = await post.save();
  res.json(savedPost);
}

async function deletePostById(req, res) {
  const errors = {};
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }
  const profile = await Profile.findOne({user: req.user.id});
  if (!profile) {
    errors.profile = "There is no profile with given id in database!";
    return res.status(404).json(errors);
  }
  const post = await Post.findById(req.params.id);
  if (post === null) {
    errors.post = "Post with given id was nof found!";
    return res.status(401).json(errors);
  }
  if (post.user.toString() !== req.user.id) {
    errors.unauthorized = "User is not authorized to delete given post!";
    return res.status(401).json(errors);
  }

  await post.remove();
  const posts = await Post.find();
  if (posts.length === 0) {
    errors.posts = "No posts found!";
    return res.status(404).json(errors);
  }
  res.json({postWasDeleted: true});
}

async function deleteCommentByPostThenByCommentId(req, res) {
  const errors = {};
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
    errors.id = "Given id is not proper!";
    return res.status(404).json(errors);
  }

  const post = await Post.findById(req.params.id);
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
  await post.save();
  res.json({commentWasDeleted: true});
}

function userAlreadyLikedThatPost(post, userId) {
  return post.likes.filter(like => like.user.toString() === userId).length > 0;
}

function commentDoesNotExist(post, commentId) {
  return post.comments.filter(comment => comment._id.toString() === commentId).length === 0;
}

module.exports = {
  getPosts: getPosts,
  getPostById: getPostById,
  likePostById: likePostById,
  unlikePostById: unlikePostById,
  addPost: addPost,
  addCommentToPostById: addCommentToPostById,
  deletePostById: deletePostById,
  deleteCommentByPostThenByCommentId: deleteCommentByPostThenByCommentId
};
