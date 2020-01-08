export default () => ({
  users: {
    sendRegistrationConfirmation: process.env.SEND_REGISTRATION_CONFIRMATION === 'true',
    registrationConfirmationExpireTime: parseInt(process.env.REGISTRATION_CONFIRMATION_EXPIRE_TIME) || 86400,
  },
});
