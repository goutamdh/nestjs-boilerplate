export default class TotpException extends Error {
  constructor (...args) {
    super(...args);
    this.name = 'TotpException';
  }
};
