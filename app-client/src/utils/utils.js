import axios from 'axios/index';

export function addAuthorizationHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
}

export function removeAuthorizationHeader() {
  delete axios.defaults.headers.common['Authorization'];
}