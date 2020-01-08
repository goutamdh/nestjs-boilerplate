export default class UsersException extends Error {
  constructor (...args) {
    super(...args);
    this.name = 'UsersException';
  }
};
