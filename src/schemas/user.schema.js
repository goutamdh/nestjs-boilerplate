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
  roles: {
    type: [String],
    required: true,
    default: ['user'],
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
}, {
  versionKey: false,
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.password;
      delete ret.totp;
    },
  },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.password;
      delete ret.totp;
    },
  },
});

UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  return next();
});
