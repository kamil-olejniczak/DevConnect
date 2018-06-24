import axios from 'axios/index';
import isEmpty from './emptyObjectValidator';

export function addAuthorizationHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  }
}

export function removeAuthorizationHeader() {
  delete axios.defaults.headers.common['Authorization'];
}

export function extractProfileDataFromResponse(profile) {
  const data = {};
  const csvSkills = typeof profile.skills === 'string' ? profile.skills : profile.skills.join(',');
  data.handle = !isEmpty(profile.handle) ? profile.handle : '';
  data.company = !isEmpty(profile.company) ? profile.company : '';
  data.website = !isEmpty(profile.website) ? profile.website : '';
  data.location = !isEmpty(profile.location) ? profile.location : '';
  data.status = !isEmpty(profile.status) ? profile.status : '';
  data.skills = !isEmpty(csvSkills) ? csvSkills : '';
  data.bio = !isEmpty(profile.bio) ? profile.bio : '';
  data.gitHubUsername = !isEmpty(profile.gitHubUsername) ? profile.gitHubUsername : '';
  if (!profile.social) {
    data.youtube = '';
    data.twitter = '';
    data.facebook = '';
    data.linkedin = '';
    data.instagram = '';
  } else {
    data.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
    data.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
    data.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
    data.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
    data.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
  }

  return data;
}

export function isPathForEditProfile(pathname) {
  return pathname === '/edit-profile';
}

export function isPathForCreateProfile(pathname) {
  return pathname === '/create-profile';
}

export function isPathForGetUserByHandle(pathname) {
  return pathname.includes('handle');
}

export function isPathForGetUserById(pathname) {
  return pathname.includes('user');
}