export default () => ({
  auth: {
    needsConfirmedRegistrationToLogin: process.env.NEEDS_CONFIRMED_REGISTRATION_TO_LOGIN === 'true',
  },
});
