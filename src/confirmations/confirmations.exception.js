export default class ConfirmationsException extends Error {
  constructor (...args) {
    super(...args);
    this.name = 'ConfirmationsException';
  }
};
