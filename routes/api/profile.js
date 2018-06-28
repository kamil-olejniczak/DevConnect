const express = require("express");
const router = express.Router();
const passport = require("passport");
const profileController = require('../../controllers/profile');
const catchAsync = require('../../middleware/error');

/**
 * @route GET api/profile
 * @desc Gets current user profile
 * @access Private
 **/
router.get("/", passport.authenticate("jwt", {session: false}), catchAsync(profileController.getCurrentProfile));

/**
 * @route GET api/profile/handle/:handle
 * @desc Returns profile based on handle
 * @access Public
 **/
router.get("/handle/:handle", catchAsync(profileController.findProfileByHandle));

/**
 * @route GET api/profile/user/:user_id
 * @desc Returns profile based on user id
 * @access Public
 **/
router.get("/user/:user_id", catchAsync(profileController.findProfileByUserId));

/**
 * @route GET api/profile/all
 * @desc Returns all profiles
 * @access Public
 **/
router.get("/all", catchAsync(profileController.getProfiles));

/**
 * @route POST api/profile
 * @desc Posts new profile for current user
 * @access Private
 **/
router.post("/", passport.authenticate("jwt", {session: false}), catchAsync(profileController.addProfile));

/**
 * @route POST api/profile/experience
 * @desc Adds new experience to user profile
 * @access Private
 **/
router.post('/experience', passport.authenticate("jwt", {session: false}), catchAsync(profileController.addExperience));

/**
 * @route POST api/profile/education
 * @desc Adds new education to user profile
 * @access Private
 **/
router.post('/education', passport.authenticate("jwt", {session: false}), catchAsync(profileController.addEducation));

/**
 * @route PUT api/profile
 * @desc Updates profile for current user
 * @access Private
 **/
router.put("/", passport.authenticate("jwt", {session: false}), catchAsync(profileController.updateProfile));

/**
 * @route DELETE api/profile/experience/:experience_id
 * @desc Deletes experience from user profile
 * @access Private
 **/
router.delete('/experience/:experience_id', passport.authenticate("jwt", {session: false}),
  catchAsync(profileController.deleteExperienceById));

/**
 * @route DELETE api/profile/education/:education_id
 * @desc Deletes education from user profile
 * @access Private
 **/
router.delete('/education/:education_id', passport.authenticate("jwt", {session: false}),
  catchAsync(profileController.deleteEducationById));

/**
 * @route DELETE api/profile
 * @desc Deletes profile from user
 * @access Private
 **/
router.delete('/', passport.authenticate("jwt", {session: false}), catchAsync(profileController.deleteProfile));

module.exports = router;
