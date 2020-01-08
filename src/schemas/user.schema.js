import { Schema } from 'mongoose';
import { UserTotpSchema } from './user-totp.schema';

export const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  totp: {
    type: UserTotpSchema,
    default: null,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  registrationConfirmedAt: {
    type: Date,
  },
});

UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  return next();
});

UserSchema.methods.toJSON = function() {
  const object = this.toObject();
  delete object.password;
  return object;
};
