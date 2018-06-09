export function removeJwtToken() {
  localStorage.removeItem('JWT_TOKEN');
}

export function saveJwtToken(token) {
  localStorage.setItem('JWT_TOKEN', token);
}
