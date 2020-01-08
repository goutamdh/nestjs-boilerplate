export default class AuthException extends Error {
  constructor (...args) {
    super(...args);
    this.name = 'AuthException';
  }
};
