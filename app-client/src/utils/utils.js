import axios from 'axios/index';

export function addAuthorizationHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  }
}

export function removeAuthorizationHeader() {
  delete axios.defaults.headers.common['Authorization'];
}