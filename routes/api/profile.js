const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const validateUserProfileInput = require("../../validation/profile");
/**
 * @route GET api/profile
 * @desc Gets current user profile
 * @access Private
 **/
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.profile = "Profile not found for current user!";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(error => res.status(404).json(error));
});

/**
 * @route POST api/profile
 * @desc Posts new profile for current user
 * @access Private
 **/
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateUserProfileInput(req.body);
  const profileFields = {};

  if (!isValid) {
    return res.status(400).json(errors);
  }

  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;
  if (typeof req.body.skills !== "undefined") profileFields.skills = req.body.skills.split(",");
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.gitHubUsername) profileFields.gitHubUsername = req.body.gitHubUsername;

  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then(profile =>
        res.json(profile)
      );
    } else {
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = "That handle already exists!";
          res.status(404).json(errors);
        }
        new Profile(profileFields).save().then(savedProfile => res.json(savedProfile));
      });
    }
  });
});

module.exports = router;
