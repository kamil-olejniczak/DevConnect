const Post = require("../models/Post");
const Profile = require("../models/Profile");
const validateUserPostInput = require("../validation/post");

function getPosts(req, res) {
  Post.find()
    .sort({date: -1})
    .then(posts => {
      if (posts.length === 0) {
        errors.posts = "No posts found!";
        return res.status(404).json(errors);
      }
      return res.json(posts);
    })
    .catch(error => res.status(404).json(error));
}

function getPostById(req, res) {
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
}

function addPost(req, res) {
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

  newPost
    .save()
    .then(post => res.json(post))
    .catch(error => res.status(404).json(error));
}

function likePostById(req, res) {
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
}

function unlikePostById(req, res) {
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
}

function addCommentToPostById(req, res) {
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
}

function deletePostById(req, res) {
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
}

function deleteCommentByPostThenByCommentId(req, res) {
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
